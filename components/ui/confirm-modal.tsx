import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Cross-platform stand-in for Alert.alert's multi-button form. react-native-web's Alert.alert
 * doesn't render custom buttons (or wire up their onPress) at all — on web, tapping a delete
 * button using that API silently does nothing. A real Modal works identically everywhere.
 */
export function ConfirmModal({ visible, title, message, confirmLabel, onConfirm, onCancel }: ConfirmModalProps) {
  const background = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={[styles.card, { backgroundColor: background }]} onPress={() => {}}>
          <ThemedText type="defaultSemiBold" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText style={styles.message}>{message}</ThemedText>
          <Pressable onPress={onConfirm} style={styles.confirmButton}>
            <ThemedText style={styles.confirmLabel}>{confirmLabel}</ThemedText>
          </Pressable>
          <Pressable onPress={onCancel} style={styles.cancelButton}>
            <ThemedText style={[styles.cancelLabel, { color: textColor }]}>Abbrechen</ThemedText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 20,
    gap: 10,
  },
  title: { textAlign: 'center' },
  message: { textAlign: 'center', opacity: 0.8, marginBottom: 4 },
  confirmButton: {
    paddingVertical: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    alignItems: 'center',
    backgroundColor: '#E5484D',
  },
  confirmLabel: { fontWeight: '600', fontSize: 16, color: '#fff' },
  cancelButton: { marginTop: 4, alignItems: 'center', paddingVertical: 10 },
  cancelLabel: { opacity: 0.7 },
});
