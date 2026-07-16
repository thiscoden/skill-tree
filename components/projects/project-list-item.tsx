import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Project } from '@/db/types';

interface ProjectListItemProps {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onArchiveToggle: () => void;
  onDelete: () => void;
}

export function ProjectListItem({
  project,
  isActive,
  onSelect,
  onEdit,
  onArchiveToggle,
  onDelete,
}: ProjectListItemProps) {
  const tint = useThemeColor({}, 'tint');
  const icon = useThemeColor({}, 'icon');
  const borderColor = useThemeColor({ light: '#E0E0E0', dark: '#2A2A2A' }, 'text');

  return (
    <Pressable
      onPress={onSelect}
      style={[styles.row, { borderColor }, isActive && { borderColor: tint, borderWidth: 2 }]}>
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
        {isActive ? <IconSymbol name="checkmark.circle.fill" size={20} color={tint} /> : null}
        <Pressable onPress={onEdit} hitSlop={8}>
          <IconSymbol name="pencil" size={20} color={icon} />
        </Pressable>
        <Pressable onPress={onArchiveToggle} hitSlop={8}>
          <IconSymbol name={project.archivedAt ? 'arrow.uturn.backward' : 'archivebox.fill'} size={20} color={icon} />
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
