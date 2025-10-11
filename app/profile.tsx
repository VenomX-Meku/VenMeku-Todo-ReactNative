import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Mekuanint (Meku)</Text>
      <Text style={styles.quote}>
        “Discipline and focus turn dreams into achievements.”
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe0b2",
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#94560aff",
  },
  quote: {
    marginTop: 15,
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    textAlign: "center",
  },
});
