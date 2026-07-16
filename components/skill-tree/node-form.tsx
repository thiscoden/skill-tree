import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { NodeType, SkillNode } from '@/db/types';

export interface NodeFormValues {
  title: string;
  description: string;
  type: NodeType;
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
  const [type, setType] = useState<NodeType>('task');
  const [icon, setIcon] = useState('');
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
        type,
        icon: icon.trim() || null,
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
        Typ
      </ThemedText>
      <View style={styles.typeRow}>
        <Pressable
          onPress={() => setType('task')}
          style={[styles.typeButton, { borderColor }, type === 'task' && { borderColor: tint, borderWidth: 2 }]}>
          <IconSymbol name="square.fill" size={16} color={type === 'task' ? tint : textColor} />
          <ThemedText>Task</ThemedText>
        </Pressable>
        <Pressable
          onPress={() => setType('capstone')}
          style={[styles.typeButton, { borderColor }, type === 'capstone' && { borderColor: tint, borderWidth: 2 }]}>
          <IconSymbol name="hexagon.fill" size={16} color={type === 'capstone' ? tint : textColor} />
          <ThemedText>Capstone</ThemedText>
        </Pressable>
      </View>

      <ThemedText type="defaultSemiBold" style={styles.label}>
        SF-Symbol (optional)
      </ThemedText>
      <TextInput
        value={icon}
        onChangeText={setIcon}
        placeholder="z. B. paperplane.fill"
        placeholderTextColor="#888"
        style={[styles.input, { color: textColor, borderColor }]}
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
  typeRow: { flexDirection: 'row', gap: 12 },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
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
