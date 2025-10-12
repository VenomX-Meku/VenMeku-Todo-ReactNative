import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // 🔸 NEW

export default function RootLayout() {
  return (
    <>
      {/* 🔸 NEW: Modern status bar */}
      <StatusBar style="light" backgroundColor="#0f2a73ff" />

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0f2a73ff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          animation: "slide_from_right", // 🔸 NEW: Smooth screen transition
        }}
      />
    </>
  );
}
