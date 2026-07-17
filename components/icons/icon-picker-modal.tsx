import { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SkillIcon } from '@/components/icons/skill-icon';
import { searchSkillIcons, type SkillIconDefinition } from '@/constants/skill-icons';
import { useThemeColor } from '@/hooks/use-theme-color';

interface IconPickerModalProps {
  visible: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const COLUMNS = 4;

export function IconPickerModal({ visible, selectedId, onSelect, onClose }: IconPickerModalProps) {
  const [query, setQuery] = useState('');
  const tint = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const icon = useThemeColor({}, 'icon');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#333' }, 'text');

  const results = searchSkillIcons(query);

  const handleSelect = (item: SkillIconDefinition) => {
    onSelect(item.id);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Icon wählen
          </ThemedText>
          <Pressable onPress={onClose} hitSlop={8}>
            <IconSymbol name="xmark.circle.fill" size={26} color={icon} />
          </Pressable>
        </View>

        <View style={[styles.searchRow, { borderColor }]}>
          <IconSymbol name="magnifyingglass" size={16} color={icon} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Icon suchen…"
            placeholderTextColor="#888"
            style={[styles.searchInput, { color: textColor }]}
          />
        </View>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          numColumns={COLUMNS}
          contentContainerStyle={styles.grid}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<ThemedText style={styles.empty}>Keine Icons gefunden.</ThemedText>}
          renderItem={({ item }) => {
            const isSelected = item.id === selectedId;
            return (
              <Pressable
                onPress={() => handleSelect(item)}
                style={[styles.cell, { borderColor: isSelected ? tint : 'transparent' }]}>
                <SkillIcon id={item.id} size={48} />
                <ThemedText numberOfLines={1} style={styles.cellLabel}>
                  {item.label}
                </ThemedText>
              </Pressable>
            );
          }}
        />
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 22 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 15, paddingVertical: 2 },
  grid: { paddingBottom: 40, gap: 4 },
  cell: {
    flex: 1 / COLUMNS,
    alignItems: 'center',
    padding: 6,
    margin: 2,
    borderWidth: 2,
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  cellLabel: { fontSize: 9, textAlign: 'center', marginTop: 2, opacity: 0.75 },
  empty: { opacity: 0.6, marginTop: 40, textAlign: 'center' },
});
