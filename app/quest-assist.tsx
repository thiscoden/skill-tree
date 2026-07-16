import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useActiveProjectId } from '@/hooks/use-active-project-id';
import { getQuestGiverProvider } from '@/providers/quest-giver';
import * as projectsRepo from '@/db/repositories/projects-repo';
import * as nodesRepo from '@/db/repositories/nodes-repo';
import type { QuestGiverSuggestion } from '@/providers/quest-giver/types';

export default function QuestAssistScreen() {
  const [activeProjectId] = useActiveProjectId();
  const [goalDescription, setGoalDescription] = useState('');
  const [strugglingNote, setStrugglingNote] = useState('');
  const [suggestion, setSuggestion] = useState<QuestGiverSuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'text');
  const background = useThemeColor({}, 'background');

  useEffect(() => {
    if (activeProjectId) {
      projectsRepo.getProject(activeProjectId).then((p) => {
        if (p) setGoalDescription(p.goalDescription);
      });
    }
  }, [activeProjectId]);

  const handleSuggest = async () => {
    if (!activeProjectId) return;
    setLoading(true);
    setError(null);
    setSuggestion(null);
    try {
      const existingNodes = await nodesRepo.listNodesByProject(activeProjectId);
      const provider = getQuestGiverProvider();
      const result = await provider.suggestNextStep({
        projectGoal: goalDescription,
        strugglingNote: strugglingNote.trim() || undefined,
        existingNodeTitles: existingNodes.map((n) => n.title),
      });
      setSuggestion(result);
    } catch {
      setError('Der Orb konnte gerade keinen Vorschlag laden. Versuch es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!activeProjectId || !suggestion) return;
    await nodesRepo.createNode({
      projectId: activeProjectId,
      type: suggestion.type,
      title: suggestion.title,
      description: suggestion.description ?? '',
      icon: suggestion.icon ?? null,
      source: 'orb',
      initialState: 'available',
    });
    router.back();
  };

  if (!activeProjectId) {
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <ThemedText>Wähle zuerst ein Projekt aus, bevor der Orb helfen kann.</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: background }]}>
      <View style={styles.header}>
        <IconSymbol name="sparkles" size={22} color={tint} />
        <ThemedText type="title" style={styles.headerTitle}>
          KI-Orb
        </ThemedText>
      </View>
      <ThemedText style={styles.question}>Was ist dein großes Ziel und wobei brauchst du Hilfe?</ThemedText>

      <TextInput
        value={goalDescription}
        onChangeText={setGoalDescription}
        placeholder="Dein Ziel"
        placeholderTextColor="#888"
        style={[styles.input, { color: textColor, borderColor }]}
      />
      <TextInput
        value={strugglingNote}
        onChangeText={setStrugglingNote}
        placeholder="Wobei hakt's gerade? (optional)"
        placeholderTextColor="#888"
        multiline
        numberOfLines={3}
        style={[styles.input, styles.multiline, { color: textColor, borderColor }]}
      />

      <Pressable
        onPress={handleSuggest}
        disabled={loading}
        style={[styles.button, { backgroundColor: tint, opacity: loading ? 0.6 : 1 }]}>
        <ThemedText style={styles.buttonLabel}>{loading ? 'Denkt nach…' : 'Nächsten Schritt vorschlagen'}</ThemedText>
      </Pressable>

      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

      {suggestion ? (
        <View style={[styles.suggestionCard, { borderColor }]}>
          <View style={styles.suggestionHeader}>
            <IconSymbol name={(suggestion.icon as never) ?? 'sparkles'} size={20} color={tint} />
            <ThemedText type="defaultSemiBold" style={styles.suggestionTitle}>
              {suggestion.title}
            </ThemedText>
          </View>
          {suggestion.description ? (
            <ThemedText style={styles.suggestionDescription}>{suggestion.description}</ThemedText>
          ) : null}
          <Pressable onPress={handleAccept} style={[styles.acceptButton, { backgroundColor: tint }]}>
            <ThemedText style={styles.buttonLabel}>Als nächsten Schritt übernehmen</ThemedText>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 28, gap: 8, flexGrow: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  headerTitle: { fontSize: 22 },
  question: { opacity: 0.8, marginBottom: 12 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  multiline: { minHeight: 70, textAlignVertical: 'top' },
  button: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  buttonLabel: { color: '#fff', fontWeight: '600', fontSize: 16 },
  error: { color: '#E5484D', marginTop: 12 },
  suggestionCard: {
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 16,
    gap: 8,
  },
  suggestionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  suggestionTitle: { flex: 1 },
  suggestionDescription: { opacity: 0.75 },
  acceptButton: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 12,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
});
