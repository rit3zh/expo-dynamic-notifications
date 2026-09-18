import { DynamicNotifications } from "@/components";
import { FONT_ASSETS } from "@/components/mock/fonts";
import { FEED } from "@/components/mock/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts(FONT_ASSETS);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <DynamicNotifications accent={FEED.ink}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: FEED.bg },
            }}
          />
        </DynamicNotifications>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
