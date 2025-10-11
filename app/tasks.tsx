import { Text, View } from "react-native";

export default function TasksScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightblue",
      }}
    >
      <Text>📝 This is your Tasks screen!</Text>
    </View>
  );
}
