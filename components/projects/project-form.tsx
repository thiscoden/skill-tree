import { useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export interface ProjectFormValues {
  name: string;
  goalDescription: string;
}

interface ProjectFormProps {
  initialValues?: ProjectFormValues;
  submitLabel: string;
  onSubmit: (values: ProjectFormValues) => void | Promise<void>;
}

export function ProjectForm({ initialValues, submitLabel, onSubmit }: ProjectFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [goalDescription, setGoalDescription] = useState(initialValues?.goalDescription ?? '');
  const [submitting, setSubmitting] = useState(false);

  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'text');

  const canSubmit = name.trim().length > 0 && !submitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), goalDescription: goalDescription.trim() });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.label}>
        Name
      </ThemedText>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="z. B. Auslandssemester in Shanghai"
        placeholderTextColor="#888"
        style={[styles.input, { color: textColor, borderColor }]}
      />

      <ThemedText type="defaultSemiBold" style={styles.label}>
        Ziel
      </ThemedText>
      <TextInput
        value={goalDescription}
        onChangeText={setGoalDescription}
        placeholder="Was willst du erreichen?"
        placeholderTextColor="#888"
        multiline
        numberOfLines={4}
        style={[styles.input, styles.multiline, { color: textColor, borderColor }]}
      />

      <Pressable
        onPress={handleSubmit}
        disabled={!canSubmit}
        style={[styles.button, { backgroundColor: tint, opacity: canSubmit ? 1 : 0.5 }]}>
        <ThemedText style={styles.buttonLabel}>{submitLabel}</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 8,
  },
  label: {
    marginTop: 12,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 12,
    fontSize: 16,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
