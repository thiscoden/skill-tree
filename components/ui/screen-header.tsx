import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconSymbol, type IconSymbolName } from '@/components/ui/icon-symbol';
import { SkillTreeColors } from '@/constants/skill-tree-theme';

interface ScreenHeaderAction {
  icon: IconSymbolName;
  onPress: () => void;
}

interface ScreenHeaderProps {
  title: string;
  action?: ScreenHeaderAction;
}

/**
 * Gothic obsidian-and-silver chrome for the main tab screens. Fixed dark background + label
 * color (not theme-following) — same reasoning as SkillTreeColors.label: this sits directly on
 * the app's purple tree background, so it must stay legible regardless of light/dark mode.
 */
export function ScreenHeader({ title, action }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {action ? (
        <Pressable onPress={action.onPress} hitSlop={8} style={styles.crystalRing}>
          <View style={styles.crystalCore}>
            <IconSymbol name={action.icon} size={18} color="#fff" />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    // Without an `action`, the row's content is just the title text (~34px), shorter than the
    // 40px crystal button — pin a minHeight so every screen's bar is the same height regardless
    // of whether it has an action button.
    minHeight: 116,
    backgroundColor: SkillTreeColors.chrome.background,
    borderBottomWidth: 1.5,
    borderBottomColor: SkillTreeColors.chrome.metalBorder,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: SkillTreeColors.label,
  },
  crystalRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SkillTreeColors.chrome.crystal.glow,
    borderWidth: 1.5,
    borderColor: SkillTreeColors.chrome.crystal.ring,
    shadowColor: SkillTreeColors.chrome.crystal.ring,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  crystalCore: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SkillTreeColors.chrome.crystal.core,
  },
});
