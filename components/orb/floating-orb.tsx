import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { BlurView } from 'expo-blur';
import { IconSymbol } from '@/components/ui/icon-symbol';

const ORB_SIZE = 56;
const TAB_BAR_HEIGHT = 49;

export function FloatingOrb() {
  const insets = useSafeAreaInsets();

  const bottom = insets.bottom + TAB_BAR_HEIGHT + 16;

  const handlePress = () => {
    router.push('/quest-assist');
  };

  const content = (
    <Pressable onPress={handlePress} style={styles.pressable} accessibilityLabel="KI-Orb — Hilfe beim nächsten Schritt" accessibilityRole="button">
      <IconSymbol name="sparkles" size={26} color="#FFD54A" />
    </Pressable>
  );

  if (isLiquidGlassAvailable()) {
    return (
      <GlassView isInteractive style={[styles.orb, { bottom, right: 20 }]}>
        {content}
      </GlassView>
    );
  }

  return (
    <BlurView tint="systemMaterial" intensity={90} style={[styles.orb, { bottom, right: 20 }]}>
      {content}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 16px rgba(255, 213, 74, 0.45)',
  },
  pressable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
