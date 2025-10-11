import { StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Task Detail</Text>
      <Text style={styles.description}>
        Here you can see detailed information about your selected task.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe5b4",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#94560aff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
