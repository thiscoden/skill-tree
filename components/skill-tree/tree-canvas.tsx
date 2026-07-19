import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

import { NodeGlyph } from './node-glyph';
import { computeLayout } from './layout';
import { SkillTreeColors } from '@/constants/skill-tree-theme';
import type { SkillNode } from '@/db/types';
import type { EdgeVM } from '@/viewmodel/skill-tree-viewmodel';

interface TreeCanvasProps {
  nodes: SkillNode[];
  edges: EdgeVM[];
  onNodePress: (id: string) => void;
  onNodeLongPress: (id: string) => void;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 2.5;
const NODE_HALF_WIDTH = 42;
const SHAPE_CENTER_OFFSET = 28;
// Wheel deltaY is typically in the hundreds per notch — this keeps a single scroll tick
// feeling like a small, controllable zoom step rather than an abrupt jump.
const WHEEL_ZOOM_SENSITIVITY = 0.001;

const EDGE_COLOR: Record<SkillNode['state'], string> = {
  locked: SkillTreeColors.edge.inactive,
  available: SkillTreeColors.edge.inactive,
  mastered: SkillTreeColors.edge.active,
};

export function TreeCanvas({ nodes, edges, onNodePress, onNodeLongPress }: TreeCanvasProps) {
  const { positions, width, height } = useMemo(() => computeLayout(nodes, edges), [nodes, edges]);
  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  // Reloading after an unrelated edit (e.g. saving a node's title) produces a new `nodes` array
  // with the same members — recompute a signature of *which* nodes exist so the recenter effect
  // below only reacts to an actual structural change (node added/removed), not every refetch.
  const nodeIdSignature = useMemo(() => nodes.map((n) => n.id).sort().join(','), [nodes]);

  const containerRef = useRef<View>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const savedScale = useSharedValue(1);

  const handleContainerLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    setContainerSize({ width: w, height: h });
  };

  // Keep the tree centered on first measurement, on container resize (e.g. desktop window
  // resize), and when the set of nodes actually changes (switching project, adding/removing a
  // node) — but NOT on every reload, so editing a node's title/description and saving leaves the
  // user's manual pan/zoom exactly where it was instead of snapping back to center.
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;
    const centerX = (containerSize.width - width) / 2;
    const centerY = (containerSize.height - height) / 2;
    translateX.value = centerX;
    translateY.value = centerY;
    savedTranslateX.value = centerX;
    savedTranslateY.value = centerY;
    scale.value = 1;
    savedScale.value = 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- width/height intentionally excluded, see comment above
  }, [containerSize.width, containerSize.height, nodeIdSignature, translateX, translateY, savedTranslateX, savedTranslateY, scale, savedScale]);

  // Web/desktop: mouse wheel zooms in place of touch pinch — react-native-gesture-handler's
  // Pan gesture already handles mouse click-drag for panning on web via pointer events, so wheel
  // only needs to cover zoom.
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = containerRef.current as unknown as HTMLElement | null;
    if (!node) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = savedScale.value * (1 - e.deltaY * WHEEL_ZOOM_SENSITIVITY);
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
      scale.value = clamped;
      savedScale.value = clamped;
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
  }, [scale, savedScale]);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const next = savedScale.value * e.scale;
      scale.value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <View ref={containerRef} style={styles.container} onLayout={handleContainerLayout}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[{ width, height }, animatedStyle]}>
          <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
            {edges.map((edge) => {
              const from = positions.get(edge.sourceNodeId);
              const to = positions.get(edge.targetNodeId);
              const targetNode = nodeById.get(edge.targetNodeId);
              if (!from || !to || !targetNode) return null;
              const color = EDGE_COLOR[targetNode.state];
              return (
                <Line
                  key={edge.id}
                  x1={from.x}
                  y1={from.y + SHAPE_CENTER_OFFSET}
                  x2={to.x}
                  y2={to.y + SHAPE_CENTER_OFFSET}
                  stroke={color}
                  strokeWidth={targetNode.state === 'mastered' ? 5 : 2}
                  strokeOpacity={targetNode.state === 'mastered' ? 1 : 0.55}
                />
              );
            })}
          </Svg>

          {nodes.map((node) => {
            const pos = positions.get(node.id);
            if (!pos) return null;
            return (
              <View
                key={node.id}
                style={[styles.nodeWrapper, { left: pos.x - NODE_HALF_WIDTH, top: pos.y - SHAPE_CENTER_OFFSET }]}>
                <NodeGlyph
                  title={node.title}
                  icon={node.icon}
                  state={node.state}
                  onPress={() => onNodePress(node.id)}
                  onLongPress={() => onNodeLongPress(node.id)}
                />
              </View>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden', backgroundColor: SkillTreeColors.background },
  nodeWrapper: { position: 'absolute', width: 84, alignItems: 'center' },
});
