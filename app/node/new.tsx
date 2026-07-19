import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { NodeForm, type NodeFormValues } from '@/components/skill-tree/node-form';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import * as nodesRepo from '@/db/repositories/nodes-repo';
import * as edgesRepo from '@/db/repositories/edges-repo';
import { computeDepths, reduceRedundantPrerequisites, type UnlockEdge } from '@/domain/unlock';
import { reevaluateProjectGraph } from '@/domain/mastery';
import type { SkillNode } from '@/db/types';

interface PendingReroute {
  newNodeId: string;
  successors: SkillNode[];
}

export default function NewNodeScreen() {
  const [activeProjectId] = useActiveProjectId();
  const { anchorNodeId, insertMode } = useLocalSearchParams<{ anchorNodeId?: string; insertMode?: string }>();
  const [existingNodes, setExistingNodes] = useState<SkillNode[]>([]);
  const [existingEdges, setExistingEdges] = useState<UnlockEdge[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [pendingReroute, setPendingReroute] = useState<PendingReroute | null>(null);
  const [checkedSuccessorIds, setCheckedSuccessorIds] = useState<string[]>([]);
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const tintText = useThemeColor({}, 'tintText');

  useEffect(() => {
    if (!activeProjectId) return;
    (async () => {
      const [nodesList, edgesList] = await Promise.all([
        nodesRepo.listNodesByProject(activeProjectId),
        edgesRepo.listEdgesByProject(activeProjectId),
      ]);
      // Both must land before <NodeForm> mounts — it only reads `initialValues` once, at mount,
      // and the "insert before" prefill below depends on `existingEdges` already being loaded.
      setExistingNodes(nodesList);
      setExistingEdges(edgesList);
      setLoaded(true);
    })();
  }, [activeProjectId]);

  if (!activeProjectId || !loaded) return <ThemedView style={{ flex: 1 }} />;

  // "Danach einfügen" (or the plain "+" button, no anchor at all): the new node simply depends on
  // the anchor. "Davor einfügen": the new node slots between the anchor and whatever it currently
  // depends on, so it inherits the anchor's *current* prerequisites instead.
  const prefilledPrerequisiteIds =
    insertMode === 'before' && anchorNodeId
      ? existingEdges.filter((e) => e.targetNodeId === anchorNodeId).map((e) => e.sourceNodeId)
      : anchorNodeId
        ? [anchorNodeId]
        : [];

  const handleSubmit = async (values: NodeFormValues) => {
    // Defense-in-depth: the picker already keeps the selection reduced live, but re-check
    // here too in case existingEdges was stale when the user submitted.
    const prerequisiteIds = reduceRedundantPrerequisites(values.prerequisiteIds, existingEdges);
    const node = await nodesRepo.createNode({
      projectId: activeProjectId,
      type: 'task',
      title: values.title,
      description: values.description,
      icon: values.icon,
      source: 'manual',
      initialState: prerequisiteIds.length > 0 ? 'locked' : 'available',
    });
    if (prerequisiteIds.length > 0) {
      await edgesRepo.setPrerequisites(activeProjectId, node.id, prerequisiteIds);
    }

    if (insertMode === 'before' && anchorNodeId) {
      // Splice: the anchor's old dependency path now runs through the new node — whatever the
      // user did or didn't keep checked above only affects what the *new* node depends on, the
      // anchor unconditionally ends up depending solely on it. That's the definition of "before".
      await edgesRepo.setPrerequisites(activeProjectId, anchorNodeId, [node.id]);
      // The anchor may have been available/mastered; it can now have an unmet prerequisite
      // (the brand-new, never-mastered node), so its state needs a full cascade recompute.
      await reevaluateProjectGraph(activeProjectId);
    }

    if (insertMode === 'after' && anchorNodeId) {
      // Always ask — including (especially) when the anchor is a chain-end with nothing directly
      // downstream: the new node can still become a prerequisite for any other node in a deeper
      // tier, not just the anchor's own descendants. Only nodes strictly deeper than the anchor
      // qualify — anything at the same or a shallower tier is excluded, which also rules out
      // cycles for free (an ancestor of the anchor always has a smaller depth, see computeDepths).
      const depths = computeDepths(existingNodes.map((n) => n.id), existingEdges);
      const anchorDepth = depths.get(anchorNodeId) ?? 0;
      const candidates = existingNodes.filter((n) => (depths.get(n.id) ?? 0) > anchorDepth);
      setPendingReroute({ newNodeId: node.id, successors: candidates });
      return;
    }

    router.back();
  };

  const toggleSuccessor = (id: string) => {
    setCheckedSuccessorIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const allSuccessorsChecked =
    pendingReroute !== null && pendingReroute.successors.every((s) => checkedSuccessorIds.includes(s.id));

  const toggleAllSuccessors = () => {
    if (!pendingReroute) return;
    setCheckedSuccessorIds(allSuccessorsChecked ? [] : pendingReroute.successors.map((s) => s.id));
  };

  const handleConfirmReroute = async () => {
    if (!pendingReroute || !activeProjectId) return;
    for (const successor of pendingReroute.successors) {
      if (!checkedSuccessorIds.includes(successor.id)) continue;
      // Swap only the one anchor→successor edge — a successor with other prerequisites too
      // (a diamond merge) keeps them; this isn't a blanket replace like the "before" splice is.
      const currentPrereqs = existingEdges.filter((e) => e.targetNodeId === successor.id).map((e) => e.sourceNodeId);
      const nextPrereqs = currentPrereqs.filter((id) => id !== anchorNodeId).concat(pendingReroute.newNodeId);
      await edgesRepo.setPrerequisites(activeProjectId, successor.id, nextPrereqs);
    }
    // A rerouted successor may have been available/mastered and can now have an unmet
    // prerequisite (the brand-new node), so its state needs a full cascade recompute.
    await reevaluateProjectGraph(activeProjectId);
    router.back();
  };

  if (pendingReroute) {
    return (
      <ThemedView style={styles.rerouteContainer}>
        <ThemedText type="defaultSemiBold">Voraussetzung für:</ThemedText>
        <Pressable onPress={toggleAllSuccessors} style={styles.rerouteSelectAll}>
          <IconSymbol
            name={allSuccessorsChecked ? 'checkmark.circle.fill' : 'questionmark.circle'}
            size={20}
            color={allSuccessorsChecked ? tint : textColor}
          />
          <ThemedText>Alle Nachfolgeknoten</ThemedText>
        </Pressable>
        <View style={styles.rerouteRow}>
          {pendingReroute.successors.map((s) => (
            <Pressable key={s.id} onPress={() => toggleSuccessor(s.id)} style={styles.rerouteItem}>
              <IconSymbol
                name={checkedSuccessorIds.includes(s.id) ? 'checkmark.circle.fill' : 'questionmark.circle'}
                size={22}
                color={checkedSuccessorIds.includes(s.id) ? tint : textColor}
              />
              <ThemedText style={styles.rerouteLabel} numberOfLines={2}>
                {s.title}
              </ThemedText>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={handleConfirmReroute} style={[styles.rerouteButton, { backgroundColor: tint }]}>
          <ThemedText style={[styles.rerouteButtonLabel, { color: tintText }]}>Fertig</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <NodeForm
      candidatePrerequisites={[]}
      existingEdges={existingEdges}
      initialValues={{ title: '', description: '', icon: null, prerequisiteIds: prefilledPrerequisiteIds }}
      primaryAction={{ label: 'Knoten anlegen', onPress: handleSubmit }}
    />
  );
}

const styles = StyleSheet.create({
  rerouteContainer: { flex: 1, padding: 20, gap: 16 },
  rerouteSelectAll: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rerouteRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  rerouteItem: { width: 84, alignItems: 'center', gap: 4 },
  rerouteLabel: { fontSize: 13, textAlign: 'center' },
  rerouteButton: { marginTop: 12, paddingVertical: 14, borderRadius: 14, borderCurve: 'continuous', alignItems: 'center' },
  rerouteButtonLabel: { fontWeight: '600', fontSize: 16 },
});
