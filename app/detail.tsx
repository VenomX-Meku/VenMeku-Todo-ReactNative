import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
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

  // Modal state for editing title
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editText, setEditText] = useState(task.title);

  // Toggle status between Pending and Done
  const toggleStatus = () => {
    setTask({
      ...task,
      status: task.status === "Pending" ? "Done ✅" : "Pending",
    });
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
    setEditModalVisible(true);
  };

  // Save edit
  const saveEdit = () => {
    if (editText.trim()) setTask({ ...task, title: editText });
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
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
          <Text
            style={[styles.metaText, task.status === "Done ✅" && styles.doneText]}
          >
            Status: {task.status}
          </Text>
          <Text
            style={[
              styles.metaText,
              task.priority === "High" ? styles.highPriority : styles.lowPriority,
            ]}
          >
            Priority: {task.priority}
          </Text>
        </View>
        <Text style={styles.metaText}>Created: {task.createdAt}</Text>

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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>⬅ Back to Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>🏠 Back to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task Title</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              placeholder="Enter new title"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f4ff", padding: 20, justifyContent: "center" },
  header: { fontSize: 28, fontWeight: "bold", color: "#1E3A8A", marginBottom: 20, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 22,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "#1E3A8A", flex: 1 },
  editBadge: { padding: 6, backgroundColor: "#e0e0e0", borderRadius: 8 },
  editText: { fontSize: 16 },
  cardDescription: { fontSize: 16, color: "#333", marginBottom: 12, lineHeight: 22 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  metaText: { fontSize: 14, color: "#555" },
  doneText: { color: "#28a745", fontWeight: "bold" },
  highPriority: { color: "#FF3B30", fontWeight: "bold" },
  lowPriority: { color: "#007BFF", fontWeight: "bold" },
  actionRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  toggleButton: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginRight: 10,
  },
  shareButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  backButton: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  homeButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "85%", backgroundColor: "#fff", borderRadius: 12, padding: 22 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#333", textAlign: "center" },
  modalInput: { borderWidth: 1, borderColor: "#999", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 18 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalSaveButton: { flex: 1, backgroundColor: "#1E3A8A", padding: 12, borderRadius: 10, marginRight: 5, alignItems: "center" },
  modalCancelButton: { flex: 1, backgroundColor: "#FF3B30", padding: 12, borderRadius: 10, marginLeft: 5, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
});
