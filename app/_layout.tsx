import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen"; // 🔸 NEW
import { StatusBar } from "expo-status-bar"; // 🔸 NEW
import { useEffect } from "react"; // 🔸 NEW

export default function RootLayout() {
  // 🔸 Prevent splash from hiding automatically and hide after 2 seconds
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  return (
    <>
      {/* 🔸 Modern status bar */}
      <StatusBar style="light" backgroundColor="#380346ff" />

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#380346ff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          animation: "slide_from_right", // 🔸 Smooth screen transition
        }}
      />
    </>
  );
}
