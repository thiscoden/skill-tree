import { Platform, StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { SkillTreeColors } from '@/constants/skill-tree-theme';
import { questScrollIconXml } from '@/assets/icons/quest-scroll-icon';
import { treeOfLifeIconXml } from '@/assets/icons/tree-of-life-icon';

/** Same glow ring, but for the custom illustrated icons — those carry their own fixed colors
 * (own white card background baked in), so only the ring glows on focus, not the artwork. */
function RuneImageIcon({ xml, focused }: { xml: string; focused: boolean }) {
  return (
    <View
      style={[
        styles.runeRing,
        focused && {
          backgroundColor: SkillTreeColors.chrome.rune.glow,
          borderColor: SkillTreeColors.chrome.rune.active,
        },
      ]}>
      <View style={styles.imageIconClip}>
        <SvgXml xml={xml} width={28} height={28} />
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Projekte',
          tabBarIcon: ({ focused }) => <RuneImageIcon xml={questScrollIconXml} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="tree"
        options={{
          title: 'Skilltree',
          tabBarIcon: ({ focused }) => <RuneImageIcon xml={treeOfLifeIconXml} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: SkillTreeColors.chrome.background,
    borderTopWidth: 1.5,
    borderTopColor: SkillTreeColors.chrome.metalBorder,
    // Taller bar + more breathing room around the icons — mobile only (web keeps the default
    // bar height from the earlier reskin, untouched here).
    ...Platform.select({
      ios: { height: 92, paddingTop: 14, paddingBottom: 32 },
      android: { height: 76, paddingTop: 14, paddingBottom: 14 },
      default: {},
    }),
  },
  runeRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  imageIconClip: {
    // Matches ScreenHeader's crystalCore (28x28) exactly, per request.
    width: 28,
    height: 28,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
