import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDatabaseReady } from '@/hooks/use-database-ready';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const dbReady = useDatabaseReady();

  return (
    <GestureHandlerRootView style={styles.root}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {!dbReady ? (
          <View style={styles.root} />
        ) : (
          <>
            <View style={styles.root}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="project/new" options={{ presentation: 'modal', title: 'Neues Projekt' }} />
                <Stack.Screen name="project/[id]/edit" options={{ presentation: 'modal', title: 'Projekt bearbeiten' }} />
                <Stack.Screen name="node/new" options={{ presentation: 'modal', title: 'Neuer Knoten' }} />
                <Stack.Screen name="node/[id]" options={{ presentation: 'modal', title: 'Knoten' }} />
                <Stack.Screen
                  name="quest-assist"
                  options={{
                    presentation: 'formSheet',
                    sheetGrabberVisible: true,
                    sheetAllowedDetents: [0.5, 0.9],
                    contentStyle: { backgroundColor: 'transparent' },
                    headerShown: false,
                  }}
                />
              </Stack>
            </View>

            <StatusBar style="auto" />
          </>
        )}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
