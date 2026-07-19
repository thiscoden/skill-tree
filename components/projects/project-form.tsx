import { useState } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, TextInput, Pressable, View } from 'react-native';
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder } from 'expo-audio';
import { File } from 'expo-file-system';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { isBackendConfigured } from '@/providers/tree-generator';
import { getAudioTranscriberProvider } from '@/providers/audio-transcriber';

// Raw recorder output (m4a/AAC container) sent under this mimeType — Gemini's documented inline
// audio support only lists bare "audio/aac", not the mp4/m4a container name. Verified working.
const GOAL_AUDIO_MIME_TYPE = 'audio/aac';

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
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const textColor = useThemeColor({}, 'text');
  const tint = useThemeColor({}, 'tint');
  const tintText = useThemeColor({}, 'tintText');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'text');

  const canSubmit = name.trim().length > 0 && !submitting && !isRecording && !isTranscribing;
  // expo-file-system's File class (used to read the recording back out as base64) doesn't
  // support web — recording produces a blob URL there, not a native file path.
  const canRecordAudio = isBackendConfigured() && Platform.OS !== 'web';

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), goalDescription: goalDescription.trim() });
    } finally {
      setSubmitting(false);
    }
  };

  const handleMicPress = async () => {
    if (isRecording) {
      await recorder.stop();
      setIsRecording(false);
      const uri = recorder.uri;
      if (!uri) return;

      setIsTranscribing(true);
      try {
        const base64 = await new File(uri).base64();
        const { text } = await getAudioTranscriberProvider().transcribe({ base64, mimeType: GOAL_AUDIO_MIME_TYPE });
        // Append rather than replace — repeat recordings accumulate, manual edits aren't clobbered.
        setGoalDescription((prev) => (prev.trim().length > 0 ? `${prev.trim()} ${text}` : text));
      } catch (error) {
        console.error('audio transcription failed', error);
        Alert.alert('Transkription fehlgeschlagen', 'Die Sprachaufnahme konnte nicht in Text umgewandelt werden. Erneut versuchen?');
      } finally {
        setIsTranscribing(false);
      }
      return;
    }

    const permission = await AudioModule.requestRecordingPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Mikrofon-Zugriff verweigert', 'Erlaube den Mikrofon-Zugriff in den Systemeinstellungen, um dein Ziel per Sprachaufnahme zu beschreiben.');
      return;
    }
    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    await recorder.prepareToRecordAsync();
    recorder.record();
    setIsRecording(true);
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
      <View style={styles.goalInputWrapper}>
        <TextInput
          value={goalDescription}
          onChangeText={setGoalDescription}
          placeholder="Was willst du erreichen?"
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          style={[styles.input, styles.multiline, canRecordAudio && styles.goalInput, { color: textColor, borderColor }]}
        />
        {canRecordAudio && (
          <View style={styles.micButton}>
            {isTranscribing ? (
              <ActivityIndicator size="small" color={tint} />
            ) : (
              <Pressable onPress={handleMicPress} hitSlop={8}>
                <IconSymbol name={isRecording ? 'stop.fill' : 'mic.fill'} size={22} color={isRecording ? '#E5484D' : tint} />
              </Pressable>
            )}
          </View>
        )}
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={!canSubmit}
        style={[styles.button, { backgroundColor: tint, opacity: canSubmit ? 1 : 0.5 }]}>
        <ThemedText style={[styles.buttonLabel, { color: tintText }]}>{submitLabel}</ThemedText>
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
  goalInputWrapper: {
    position: 'relative',
  },
  goalInput: {
    paddingRight: 44,
  },
  micButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  button: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  buttonLabel: {
    fontWeight: '600',
    fontSize: 16,
  },
});
