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
import Svg, { Polygon } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { NodeState, NodeType } from '@/db/types';

const SIZE = 56;

function octagonPoints(size: number): string {
  const r = size / 2;
  const points: string[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i + Math.PI / 8;
    points.push(`${r + r * Math.cos(angle)},${r + r * Math.sin(angle)}`);
  }
  return points.join(' ');
}

const OCTAGON_POINTS = octagonPoints(SIZE);

const STATE_COLOR: Record<NodeState, string> = {
  locked: '#555555',
  available: '#3B82F6',
  mastered: '#FFD54A',
};

interface NodeGlyphProps {
  title: string;
  icon: string | null;
  type: NodeType;
  state: NodeState;
  onPress: () => void;
  onLongPress?: () => void;
}

export function NodeGlyph({ title, icon, type, state, onPress, onLongPress }: NodeGlyphProps) {
  const color = STATE_COLOR[state];
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
    opacity: state === 'locked' ? 0.45 : 0.55 + pulse.value * 0.45,
    transform: [{ scale: 1 + pulse.value * (state === 'mastered' ? 0.1 : 0.035) }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: state === 'mastered' ? 0.25 + pulse.value * 0.35 : 0,
  }));

  const iconName = (icon as never) ?? (type === 'capstone' ? 'hexagon.fill' : 'square.fill');

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={state === 'locked'}
        style={styles.shapeContainer}>
        {state === 'mastered' && (
          <Animated.View style={[styles.glow, glowStyle]} pointerEvents="none">
            {type === 'capstone' ? (
              <Svg width={SIZE * 1.4} height={SIZE * 1.4} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                <Polygon points={OCTAGON_POINTS} fill={color} />
              </Svg>
            ) : (
              <View style={[styles.glowSquare, { backgroundColor: color }]} />
            )}
          </Animated.View>
        )}

        <Animated.View style={[styles.shapeAnimated, pulseStyle]}>
          {type === 'capstone' ? (
            <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
              <Polygon points={OCTAGON_POINTS} fill="rgba(127,127,127,0.12)" stroke={color} strokeWidth={3} />
            </Svg>
          ) : (
            <View style={[styles.taskShape, { borderColor: color }]} />
          )}
        </Animated.View>

        <View style={styles.iconOverlay} pointerEvents="none">
          <IconSymbol name={iconName} size={22} color={color} />
        </View>
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
    backgroundColor: 'rgba(127,127,127,0.12)',
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
  iconOverlay: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 11, textAlign: 'center' },
});
