import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? "#94560aff" : "#f4f3f4"}
          trackColor={{ true: "#caa46d", false: "#ccc" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5e1",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#94560aff",
    marginBottom: 30,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
});
