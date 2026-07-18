import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Project } from '@/db/types';

interface ProjectListItemProps {
  project: Project;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ProjectListItem({ project, onSelect, onEdit, onDelete }: ProjectListItemProps) {
  const icon = useThemeColor({}, 'icon');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#2A2A2A' }, 'text');

  return (
    <Pressable onPress={onSelect} style={[styles.row, { borderColor }]}>
      <View style={styles.info}>
        <ThemedText type="defaultSemiBold" numberOfLines={1}>
          {project.name}
        </ThemedText>
        {project.goalDescription ? (
          <ThemedText numberOfLines={2} style={styles.goal}>
            {project.goalDescription}
          </ThemedText>
        ) : null}
      </View>
      <View style={styles.actions}>
        <Pressable onPress={onEdit} hitSlop={8}>
          <IconSymbol name="pencil" size={20} color={icon} />
        </Pressable>
        <Pressable onPress={onDelete} hitSlop={8}>
          <IconSymbol name="trash" size={20} color="#E5484D" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    gap: 12,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  goal: {
    fontSize: 13,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
});
