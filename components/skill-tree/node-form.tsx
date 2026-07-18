import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SkillIcon } from '@/components/icons/skill-icon';
import { IconPickerModal } from '@/components/icons/icon-picker-modal';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { SkillNode } from '@/db/types';

export interface NodeFormValues {
  title: string;
  description: string;
  icon: string | null;
  prerequisiteIds: string[];
}

interface NodeFormProps {
  candidatePrerequisites: SkillNode[];
  submitLabel: string;
  onSubmit: (values: NodeFormValues) => void | Promise<void>;
}

export function NodeForm({ candidatePrerequisites, submitLabel, onSubmit }: NodeFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState<string | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [prerequisiteIds, setPrerequisiteIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'text');

  const canSubmit = title.trim().length > 0 && !submitting;

  const toggle = (id: string) => {
    setPrerequisiteIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        icon,
        prerequisiteIds,
      });
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
        placeholder="Optional"
        placeholderTextColor="#888"
        multiline
        numberOfLines={3}
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
        onSelect={setIcon}
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

      <Pressable
        onPress={handleSubmit}
        disabled={!canSubmit}
        style={[styles.button, { backgroundColor: tint, opacity: canSubmit ? 1 : 0.5 }]}>
        <ThemedText style={styles.buttonLabel}>{submitLabel}</ThemedText>
      </Pressable>
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
  multiline: { minHeight: 80, textAlignVertical: 'top' },
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
  buttonLabel: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
