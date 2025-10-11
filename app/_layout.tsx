import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ff9100" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  );
}
