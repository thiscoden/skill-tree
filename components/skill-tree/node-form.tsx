import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SkillIcon } from '@/components/icons/skill-icon';
import { IconPickerModal } from '@/components/icons/icon-picker-modal';
import { useThemeColor } from '@/hooks/use-theme-color';
import { reduceRedundantPrerequisites, type UnlockEdge } from '@/domain/unlock';
import type { SkillNode } from '@/db/types';

export interface NodeFormValues {
  title: string;
  description: string;
  icon: string | null;
  prerequisiteIds: string[];
}

interface NodeFormPrimaryAction {
  label: string;
  onPress: (values: NodeFormValues) => void | Promise<void>;
  /** Extra condition beyond "title is non-empty" — e.g. the edit flow disables "Erledigt"
      while the node is still locked. */
  disabled?: boolean;
}

interface NodeFormProps {
  candidatePrerequisites: SkillNode[];
  /** The project's existing prerequisite edges — used to auto-drop a selection that's already
      implied transitively by another one (e.g. picking a tier-3 node makes its tier-1 ancestor
      redundant to also pick directly). */
  existingEdges?: UnlockEdge[];
  /** Pre-fills the form for editing an existing node; omit for the create flow. */
  initialValues?: NodeFormValues;
  /** Fires on every field change (title/description blur, icon pick) so the caller can persist
      immediately. Omit for the create flow — there's no node yet to save into. */
  onAutosave?: (values: NodeFormValues) => void | Promise<void>;
  /** Bottom-of-form action button, e.g. "Knoten anlegen" (create) or "Erledigt" (edit). Omit to
      render no primary button at all. */
  primaryAction?: NodeFormPrimaryAction;
  /** Shows a plain red "Löschen" text button below the primary action; omit for the create flow. */
  onDelete?: () => void;
}

export function NodeForm({
  candidatePrerequisites,
  existingEdges = [],
  initialValues,
  onAutosave,
  primaryAction,
  onDelete,
}: NodeFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [icon, setIcon] = useState<string | null>(initialValues?.icon ?? null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [prerequisiteIds, setPrerequisiteIds] = useState<string[]>(initialValues?.prerequisiteIds ?? []);
  const [submitting, setSubmitting] = useState(false);
  // A long single-line title otherwise renders scrolled to the caret (end of text) before the
  // field is ever focused — this pins the visible window to the start until the user taps in,
  // at which point native cursor behavior takes back over.
  const [titleSelection, setTitleSelection] = useState<{ start: number; end: number } | undefined>({
    start: 0,
    end: 0,
  });

  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const tintText = useThemeColor({}, 'tintText');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'text');

  const canSubmit = title.trim().length > 0 && !submitting && !primaryAction?.disabled;

  const toggle = (id: string) => {
    setPrerequisiteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      return reduceRedundantPrerequisites(next, existingEdges);
    });
  };

  const currentValues = (patch: Partial<NodeFormValues> = {}): NodeFormValues => ({
    title: title.trim(),
    description: description.trim(),
    icon,
    prerequisiteIds,
    ...patch,
  });

  const handleBlurAutosave = () => {
    if (!title.trim()) return;
    onAutosave?.(currentValues());
  };

  // Leaving the screen (back-swipe, hardware back) unmounts this component without necessarily
  // blurring whichever field was last focused first — react-native-screens doesn't guarantee a
  // blur fires on teardown. Mirroring the latest values into a ref every render (instead of
  // relying on the effect's own stale closure) lets a one-time unmount cleanup flush whatever was
  // last typed, so leaving by any route is as safe as blurring the field would have been.
  const latestValues = useRef(currentValues());
  latestValues.current = currentValues();
  useEffect(() => {
    return () => {
      if (!latestValues.current.title) return;
      onAutosave?.(latestValues.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally unmount-only; ref stays current every render
  }, []);

  const handlePrimaryPress = async () => {
    if (!canSubmit || !primaryAction) return;
    setSubmitting(true);
    try {
      const values = currentValues();
      await onAutosave?.(values);
      await primaryAction.onPress(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText type="defaultSemiBold">Titel</ThemedText>
      <TextInput
        value={title}
        onChangeText={setTitle}
        onBlur={handleBlurAutosave}
        onFocus={() => setTitleSelection(undefined)}
        selection={titleSelection}
        placeholder="z. B. Motivationsschreiben entwerfen"
        placeholderTextColor="#888"
        style={[styles.input, { color: textColor, borderColor }]}
      />

      <ThemedText type="defaultSemiBold" style={styles.label}>
        Beschreibung
      </ThemedText>
      <TextInput
        value={description}
        onChangeText={setDescription}
        onBlur={handleBlurAutosave}
        placeholder="Optional"
        placeholderTextColor="#888"
        multiline
        style={[styles.input, styles.multiline, { color: textColor, borderColor }]}
      />

      <ThemedText type="defaultSemiBold" style={styles.label}>
        Icon (optional)
      </ThemedText>
      <Pressable onPress={() => setPickerVisible(true)} style={[styles.iconTrigger, { borderColor }]}>
        <IconSymbol name="line.3.horizontal" size={18} color={textColor} />
        {icon ? (
          <SkillIcon id={icon} size={32} />
        ) : (
          <ThemedText style={styles.iconTriggerLabel}>Icon wählen…</ThemedText>
        )}
      </Pressable>
      <IconPickerModal
        visible={pickerVisible}
        selectedId={icon}
        onSelect={(id) => {
          setIcon(id);
          onAutosave?.(currentValues({ icon: id }));
        }}
        onClose={() => setPickerVisible(false)}
      />

      {candidatePrerequisites.length > 0 && (
        <>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Voraussetzungen
          </ThemedText>
          {candidatePrerequisites.map((node) => (
            <Pressable key={node.id} onPress={() => toggle(node.id)} style={styles.prereqRow}>
              <IconSymbol
                name={prerequisiteIds.includes(node.id) ? 'checkmark.circle.fill' : 'questionmark.circle'}
                size={20}
                color={prerequisiteIds.includes(node.id) ? tint : textColor}
              />
              <ThemedText style={styles.prereqLabel} numberOfLines={1}>
                {node.title}
              </ThemedText>
            </Pressable>
          ))}
        </>
      )}

      {primaryAction ? (
        <Pressable
          onPress={handlePrimaryPress}
          disabled={!canSubmit}
          style={[styles.button, { backgroundColor: tint, opacity: canSubmit ? 1 : 0.5 }]}>
          <ThemedText style={[styles.buttonLabel, { color: tintText }]}>{primaryAction.label}</ThemedText>
        </Pressable>
      ) : null}

      {onDelete ? (
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <ThemedText style={styles.deleteLabel}>Löschen</ThemedText>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 8, paddingBottom: 60 },
  label: { marginTop: 12 },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 12,
    fontSize: 16,
  },
  multiline: { minHeight: 48, textAlignVertical: 'top' },
  iconTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  iconTriggerLabel: { opacity: 0.6 },
  prereqRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  prereqLabel: { flex: 1 },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  buttonLabel: { fontWeight: '600', fontSize: 16 },
  deleteButton: { marginTop: 12, alignItems: 'center', paddingVertical: 10 },
  deleteLabel: { color: '#E5484D' },
});
