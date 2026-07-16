import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
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

const EDGE_COLOR: Record<SkillNode['state'], string> = {
  locked: SkillTreeColors.edge.inactive,
  available: SkillTreeColors.edge.inactive,
  mastered: SkillTreeColors.edge.active,
};

export function TreeCanvas({ nodes, edges, onNodePress, onNodeLongPress }: TreeCanvasProps) {
  const { positions, width, height } = useMemo(() => computeLayout(nodes, edges), [nodes, edges]);
  const nodeById = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const savedScale = useSharedValue(1);

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
    <View style={styles.container}>
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
                  type={node.type}
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
