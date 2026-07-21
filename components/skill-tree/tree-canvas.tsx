import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Svg, { Polyline } from 'react-native-svg';

import { NodeGlyph } from './node-glyph';
import { computeLayout } from './layout';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SkillTreeColors } from '@/constants/skill-tree-theme';
import { useThemeColor } from '@/hooks/use-theme-color';
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
const DEFAULT_LABEL_WIDTH = 84;
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
  const canvasBg = useThemeColor({}, 'background');
  const { positions, edgeWaypoints, labelWidths, width, height } = useMemo(
    () => computeLayout(nodes, edges),
    [nodes, edges]
  );
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

  // Pan-lock: button-toggled, so it needs to live both as a shared value (read by the pan
  // worklet on the UI thread) and as React state (drives the button's icon).
  const [panLocked, setPanLocked] = useState(false);
  const panLockedShared = useSharedValue(false);

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
      // Locked: only vertical scrolling stays live, horizontal panning freezes.
      translateX.value = panLockedShared.value ? savedTranslateX.value : savedTranslateX.value + e.translationX;
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

  const handleToggleLock = () => {
    // Unlocking is a pure toggle: leave the view exactly where it is (whatever vertical
    // scroll/zoom happened while locked) and just hand pan back — don't re-center/re-fit.
    if (panLocked) {
      panLockedShared.value = false;
      setPanLocked(false);
      return;
    }

    // Locking: center on the *fitted* size, not the raw content size — a tree taller or wider
    // than the viewport would otherwise center its bounding box while clipping the overflow
    // off-screen (e.g. top tiers scrolled above the visible area), which reads as "stuck to one
    // edge" rather than centered.
    // Deliberately not clamped to MIN_SCALE: a tree wide/tall enough to need more shrinking than
    // that would otherwise still overflow the viewport on one side after "centering", which reads
    // as the tree being stuck against an edge rather than centered.
    const fitScale = Math.min(1, containerSize.width / width, containerSize.height / height);
    const nextScale = Math.min(MAX_SCALE, fitScale);
    // `transform: [translate, scale]` scales around the view's own center (RN/web default
    // transformOrigin), not its top-left corner — so the rendered top-left edge lands at
    // `translate + size/2 * (1 - scale)`, not at `translate` alone. Subtract that offset so the
    // *visible* box, not the pre-scale one, ends up centered.
    const centerX = (containerSize.width - width * nextScale) / 2 - (width / 2) * (1 - nextScale);
    const centerY = (containerSize.height - height * nextScale) / 2 - (height / 2) * (1 - nextScale);
    translateX.value = centerX;
    translateY.value = centerY;
    savedTranslateX.value = centerX;
    savedTranslateY.value = centerY;
    scale.value = nextScale;
    savedScale.value = nextScale;

    panLockedShared.value = true;
    setPanLocked(true);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <View ref={containerRef} style={[styles.container, { backgroundColor: canvasBg }]} onLayout={handleContainerLayout}>
      <GestureDetector gesture={composedGesture}>
        {/* GestureDetector's hit area is exactly its child's box — without this full-size
            wrapper, only the content-sized Animated.View below responds to touch, leaving
            background area outside the tree's bounding box dead to pan/pinch. */}
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[{ width, height }, animatedStyle]}>
            <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
              {edges.map((edge) => {
                const from = positions.get(edge.sourceNodeId);
                const to = positions.get(edge.targetNodeId);
                const targetNode = nodeById.get(edge.targetNodeId);
                if (!from || !to || !targetNode) return null;
                const color = EDGE_COLOR[targetNode.state];
                const waypoints = edgeWaypoints.get(edge.id) ?? [];
                const points = [from, ...waypoints, to]
                  .map((p) => `${p.x},${p.y + SHAPE_CENTER_OFFSET}`)
                  .join(' ');
                return (
                  <Polyline
                    key={edge.id}
                    points={points}
                    fill="none"
                    stroke={color}
                    strokeWidth={targetNode.state === 'mastered' ? 5 : 2}
                    strokeOpacity={targetNode.state === 'mastered' ? 1 : 0.55}
                    strokeLinejoin="round"
                  />
                );
              })}
            </Svg>

            {nodes.map((node) => {
              const pos = positions.get(node.id);
              if (!pos) return null;
              const labelWidth = labelWidths.get(node.id) ?? DEFAULT_LABEL_WIDTH;
              return (
                <View
                  key={node.id}
                  style={[
                    styles.nodeWrapper,
                    { left: pos.x - labelWidth / 2, top: pos.y - SHAPE_CENTER_OFFSET, width: labelWidth },
                  ]}>
                  <NodeGlyph
                    title={node.title}
                    icon={node.icon}
                    state={node.state}
                    labelWidth={labelWidth}
                    onPress={() => onNodePress(node.id)}
                    onLongPress={() => onNodeLongPress(node.id)}
                  />
                </View>
              );
            })}
          </Animated.View>
        </View>
      </GestureDetector>

      <Pressable
        onPress={handleToggleLock}
        accessibilityLabel="Mittig zentrieren"
        accessibilityHint={panLocked ? 'Pan wieder freigeben' : 'Ansicht zentrieren und Pan fixieren'}
        style={({ pressed }) => [
          styles.centerButton,
          panLocked && styles.centerButtonLocked,
          pressed && styles.centerButtonPressed,
        ]}>
        <IconSymbol name={panLocked ? 'lock.fill' : 'lock.open.fill'} size={22} color="#F3EDFB" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, overflow: 'hidden' },
  nodeWrapper: { position: 'absolute', alignItems: 'center' },
  centerButton: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(26, 16, 37, 0.55)',
    borderWidth: 1.5,
    borderColor: SkillTreeColors.chrome.metalBorderDim,
  },
  centerButtonLocked: {
    borderColor: SkillTreeColors.chrome.rune.active,
    backgroundColor: 'rgba(79, 195, 247, 0.25)',
  },
  centerButtonPressed: {
    opacity: 0.7,
  },
});
