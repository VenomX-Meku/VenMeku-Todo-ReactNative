import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TasksScreen() {
  const router = useRouter();

  const [tasks, setTasks] = useState<{ id: number; text: string }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<{ id: number; text: string } | null>(null);
  const [editText, setEditText] = useState("");

  const [quote, setQuote] = useState("Stay focused and finish what you started!");
  const quotes = [
    "Success is the sum of small efforts repeated daily.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Your future is created by what you do today, not tomorrow.",
    "Discipline is choosing between what you want now and what you want most.",
  ];

  // Load tasks from AsyncStorage on app start
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem("tasks");
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        } else {
          const defaultTasks = [
            { id: 1, text: "Finish React Native tutorial" },
            { id: 2, text: "Write project plan" },
            { id: 3, text: "Prepare presentation" },
          ];
          setTasks(defaultTasks);
          await AsyncStorage.setItem("tasks", JSON.stringify(defaultTasks));
        }
      } catch (error) {
        console.log("Error loading tasks:", error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.log("Error saving tasks:", error);
      }
    };
    saveTasks();
  }, [tasks]);

  const changeQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask }]);
    setNewTask("");
  };

  const deleteTask = (id: number) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setTasks(tasks.filter((t) => t.id !== id)),
      },
    ]);
  };

  const openEditModal = (task: { id: number; text: string }) => {
    setTaskToEdit(task);
    setEditText(task.text);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (!taskToEdit) return;
    if (editText.trim() === "") return;

    setTasks(tasks.map((t) =>
      t.id === taskToEdit.id ? { ...t, text: editText } : t
    ));
    setEditModalVisible(false);
    setTaskToEdit(null);
    setEditText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 VenMeku Task Screen</Text>
      <Text style={styles.taskCounter}>Pending Tasks: {tasks.length}</Text>

      {/* Quote Section */}
      <View style={styles.quoteSection}>
        <Text style={styles.quote}>{quote}</Text>
        <TouchableOpacity style={styles.quoteButton} onPress={changeQuote}>
          <Text style={styles.quoteButtonText}>🔄 New Quote</Text>
        </TouchableOpacity>
      </View>

      {/* Add Task */}
      <View style={styles.addTaskSection}>
        <TextInput
          style={styles.input}
          placeholder="Add new task..."
          value={newTask}
          onChangeText={setNewTask}
          multiline
          textAlignVertical="top"
          maxLength={500}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        style={styles.taskList}
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            <View style={styles.taskActions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => openEditModal(item)}
              >
                <Text style={styles.editText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => deleteTask(item.id)}
              >
                <Text style={styles.deleteText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>✏️ Edit Task</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              multiline
              textAlignVertical="top"
              maxLength={500}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#007BFF" }]}
                onPress={saveEdit}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#FF3B30" }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Back to Home */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.backButtonText}>🏠  Home ➡</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E7F0FA", padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#1E3A8A" },
  taskCounter: { fontSize: 16, fontWeight: "600", marginBottom: 15, color: "#333" },
  quoteSection: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  quote: { fontSize: 14, fontStyle: "italic", color: "#1E3A8A", textAlign: "center", marginBottom: 8 },
  quoteButton: { backgroundColor: "#1E3A8A", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  quoteButtonText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  addTaskSection: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1E3A8A",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    minHeight: 50,
  },
  addButton: { backgroundColor: "#1E3A8A", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  taskList: { marginTop: 10 },
  taskItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#D9E6F2", padding: 14, borderRadius: 12, marginBottom: 10, alignItems: "center" },
  taskText: { fontSize: 16, flex: 1, color: "#333" },
  taskActions: { flexDirection: "row", gap: 12 },
  iconButton: { padding: 6, borderRadius: 8, backgroundColor: "#F0F4FF" },
  editText: { fontSize: 18, color: "#007BFF" },
  deleteText: { fontSize: 18, color: "#FF3B30" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  modalContent: { width: "85%", backgroundColor: "#fff", borderRadius: 12, padding: 22, elevation: 6 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, color: "#1E3A8A" },
  modalInput: { borderWidth: 1, borderColor: "#999", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 18, textAlignVertical: "top", minHeight: 60 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: { flex: 1, padding: 12, borderRadius: 10, marginHorizontal: 5, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "bold" },
  backButton: { position: "absolute", bottom: 200, left: 200, right: 0, backgroundColor: "#1E3A8A", paddingVertical: 10, borderRadius: 16, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 20, height: 26 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 6 },
  backButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
