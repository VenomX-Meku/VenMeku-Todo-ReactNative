import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailScreen() {
  const router = useRouter();

  const [task, setTask] = useState({
    title: "Finish React Native tutorial",
    description:
      "Complete the tutorial covering components, hooks, navigation, and styling.",
    status: "Pending",
    createdAt: "2025-10-11",
    priority: "High",
  });

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [statusAnim] = useState(new Animated.Value(0));

  // Animate Status Toggle
  const toggleStatus = () => {
    const newStatus = task.status === "Pending" ? "Done ✅" : "Pending";
    setTask({ ...task, status: newStatus });

    Animated.timing(statusAnim, {
      toValue: newStatus === "Done ✅" ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // Share Task
  const shareTask = async () => {
    try {
      await Share.share({
        message: `Task: ${task.title}\nDescription: ${task.description}\nStatus: ${task.status}\nPriority: ${task.priority}`,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share task.");
    }
  };

  // Open Edit Modal
  const openEditModal = () => {
    setEditText(task.title);
    setEditDesc(task.description);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTask({ ...task, title: editText, description: editDesc });
    }
    setEditModalVisible(false);
  };

  // Dynamic Priority Color
  const getPriorityColor = () => {
    switch (task.priority) {
      case "High":
        return "#FF3B30";
      case "Medium":
        return "#FF9500";
      case "Low":
        return "#34C759";
      default:
        return "#007BFF";
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>📝 Task Detail</Text>

      {/* Task Card */}
      <View style={styles.card}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{task.title}</Text>
          <TouchableOpacity style={styles.editBadge} onPress={openEditModal}>
            <Text style={styles.editText}>✏️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.cardDescription}>{task.description}</Text>

        <View style={styles.metaRow}>
          <Animated.Text
            style={[
              styles.metaText,
              {
                color: statusAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["#FF9500", "#34C759"],
                }),
                fontWeight: "bold",
              },
            ]}
          >
            Status: {task.status}
          </Animated.Text>

          <Text style={[styles.metaText, { color: getPriorityColor(), fontWeight: "bold" }]}>
            Priority: {task.priority}
          </Text>
        </View>
        <Text style={[styles.metaText, { marginBottom: 12 }]}>Created: {task.createdAt}</Text>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleStatus}>
            <Text style={styles.buttonText}>
              {task.status === "Pending" ? "Mark as Done" : "Mark Pending"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={shareTask}>
            <Text style={styles.buttonText}>Share 📤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/tasks")}>
          <Text style={styles.buttonText}>⬅ Back to Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>🏠 Home</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              placeholder="Task Title"
            />
            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              value={editDesc}
              onChangeText={setEditDesc}
              placeholder="Task Description"
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalSaveButton} onPress={saveEdit}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#e0d7ff" },
  header: { fontSize: 28, fontWeight: "bold", color: "#4B0082", marginBottom: 20, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "#4B0082", flex: 1 },
  editBadge: { padding: 6, backgroundColor: "#e0e0e0", borderRadius: 10 },
  editText: { fontSize: 16 },
  cardDescription: { fontSize: 16, color: "#333", marginBottom: 12, lineHeight: 28 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  metaText: { fontSize: 14, color: "#555" },
  actionRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 14 },
  toggleButton: { flex: 1, backgroundColor: "#4B0082", paddingVertical: 14, borderRadius: 25, alignItems: "center", marginRight: 20 },
  shareButton: { flex: 1, backgroundColor: "#FF6B6B", paddingVertical: 14, borderRadius: 25, alignItems: "center", marginLeft: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  backButton: { flex: 1, backgroundColor: "#4B0082", paddingVertical: 14, borderRadius: 30, alignItems: "center", marginRight: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 5 },
  homeButton: { flex: 1, backgroundColor: "#FF6B6B", paddingVertical: 14, borderRadius: 30, alignItems: "center", marginLeft: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "85%", backgroundColor: "#fff", borderRadius: 14, padding: 22 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#4B0082", textAlign: "center" },
  modalInput: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 14 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalSaveButton: { flex: 1, backgroundColor: "#4B0082", padding: 12, borderRadius: 10, marginRight: 5, alignItems: "center" },
  modalCancelButton: { flex: 1, backgroundColor: "#FF3B30", padding: 12, borderRadius: 10, marginLeft: 5, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
});
