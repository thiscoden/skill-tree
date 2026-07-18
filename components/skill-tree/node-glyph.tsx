import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { SkillIcon } from '@/components/icons/skill-icon';
import { findSkillIcon } from '@/constants/skill-icons';
import { SkillTreeColors } from '@/constants/skill-tree-theme';
import type { NodeState } from '@/db/types';

const SIZE = 56;

const STATE_BORDER: Record<NodeState, string> = {
  locked: SkillTreeColors.node.locked.border,
  available: SkillTreeColors.node.available.border,
  mastered: SkillTreeColors.node.mastered.border,
};

interface NodeGlyphProps {
  title: string;
  icon: string | null;
  state: NodeState;
  onPress: () => void;
  onLongPress?: () => void;
  /** Static placeholder rank badge (e.g. "1/1") — not yet backed by real point tracking. */
  badge?: string;
}

export function NodeGlyph({ title, icon, state, onPress, onLongPress, badge = '1/1' }: NodeGlyphProps) {
  const color = STATE_BORDER[state];
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (state === 'available') {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 900, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else if (state === 'mastered') {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.4, { duration: 1400, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else {
      pulse.value = withTiming(0, { duration: 200 });
    }
  }, [state, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: state === 'locked' ? SkillTreeColors.node.locked.opacity : 0.55 + pulse.value * 0.45,
    transform: [{ scale: 1 + pulse.value * (state === 'mastered' ? 0.1 : 0.035) }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: state === 'mastered' ? 0.25 + pulse.value * 0.35 : 0,
  }));

  const skillIcon = findSkillIcon(icon);

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={state === 'locked'}
        style={styles.shapeContainer}>
        {state === 'mastered' && (
          <Animated.View style={[styles.glow, glowStyle]} pointerEvents="none">
            <View style={[styles.glowSquare, { backgroundColor: SkillTreeColors.node.mastered.glow }]} />
          </Animated.View>
        )}

        {/* Opaque and never animated — pulseStyle's opacity must never make the connector
            line behind this node bleed through, so the actual occlusion lives here, not on
            the animated shape below. */}
        <View style={[styles.taskBacking, { backgroundColor: SkillTreeColors.node.background }]} pointerEvents="none" />

        <Animated.View style={[styles.shapeAnimated, pulseStyle]}>
          <View
            style={[
              styles.taskShape,
              { borderColor: color, backgroundColor: skillIcon ? 'transparent' : SkillTreeColors.node.background },
            ]}
          />
          {skillIcon ? (
            <View style={styles.iconArt} pointerEvents="none">
              <SkillIcon id={skillIcon.id} size={48} />
            </View>
          ) : null}
        </Animated.View>

        {state !== 'locked' && badge ? (
          <View style={styles.badge} pointerEvents="none">
            <ThemedText style={styles.badgeText}>{badge}</ThemedText>
          </View>
        ) : null}
      </Pressable>
      <ThemedText numberOfLines={2} style={styles.label}>
        {title}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: 84, alignItems: 'center', gap: 4 },
  shapeContainer: { width: SIZE, height: SIZE, alignItems: 'center', justifyContent: 'center' },
  shapeAnimated: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskShape: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderRadius: 14,
    borderCurve: 'continuous',
  },
  taskBacking: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: 14,
    borderCurve: 'continuous',
  },
  glow: {
    position: 'absolute',
    width: SIZE * 1.4,
    height: SIZE * 1.4,
    left: -SIZE * 0.2,
    top: -SIZE * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowSquare: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderCurve: 'continuous',
  },
  iconArt: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  badge: {
    position: 'absolute',
    right: -6,
    bottom: -6,
    minWidth: 18,
    paddingHorizontal: 3,
    height: 14,
    borderRadius: 4,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: SkillTreeColors.badge.border,
    backgroundColor: SkillTreeColors.badge.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 9,
    lineHeight: 10,
    fontWeight: '700',
    color: SkillTreeColors.badge.text,
  },
  label: { fontSize: 11, textAlign: 'center' },
});
