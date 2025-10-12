// 🔹 UPDATED: Added Glowing Background (like Modal)
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  // 🔹 QUOTE FEATURE
  const [quote, setQuote] = useState(
    "Productivity is never an accident — it’s always the result of a commitment to excellence."
  );
  const quotes = [
    "Success is the sum of small efforts repeated daily.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Your future is created by what you do today, not tomorrow.",
    "Discipline is choosing between what you want now and what you want most.",
  ];
  const changeQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  // 🔹 TIMER FEATURE
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // 🔹 DARK MODE
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // 🔹 DAILY TIP
  const [tip, setTip] = useState("Stay focused and take short breaks!");
  const tips = [
    "Break tasks into smaller steps to avoid overwhelm.",
    "Prioritize the most important task first.",
    "Take a short walk to refresh your mind.",
    "Drink water regularly to stay alert.",
    "Celebrate small wins every day!",
  ];
  const changeTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    setTip(tips[randomIndex]);
  };

  return (
    <View style={styles.backgroundContainer}>
      {/* ✨ Glowing circles background */}
      <View style={styles.glowCircle1} />
      <View style={styles.glowCircle2} />

      {/* 🔹 Main content */}
      <View style={[styles.container, darkMode && styles.containerDark]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* 🔹 HEADER */}
          <View style={styles.headerSection}>
            <Text style={[styles.title, darkMode && styles.textDark]}>
              Welcome!
            </Text>
          </View>

          {/* 🔹 NAVIGATION BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/tasks")}
            >
              <Text style={styles.buttonText}>Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/detail")}
            >
              <Text style={styles.buttonText}>Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/profile")}
            >
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/settings")}
            >
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/modal")}
            >
              <Text style={styles.buttonText}>Modal</Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 QUOTE FEATURE */}
          <View style={styles.quoteSection}>
            <Text style={[styles.quote, darkMode && styles.textDark]}>
              {quote}
            </Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={changeQuote}
            >
              <Text style={styles.refreshText}>🔄 Refresh Quote</Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 REMINDER TIMER */}
          <View style={styles.timerSection}>
            <Text style={[styles.timerTitle, darkMode && styles.textDark]}>
              ⏰ Next Task In
            </Text>
            <Text style={[styles.timerText, darkMode && styles.textDark]}>
              {formatTime(secondsLeft)}
            </Text>
            <Text style={[styles.timerHint, darkMode && styles.textDark]}>
              Stay ready to focus!
            </Text>
          </View>

          {/* 🔹 DAILY TIP */}
          <View style={styles.tipSection}>
            <Text style={[styles.tipTitle, darkMode && styles.textDark]}>
              💡 Daily Tip
            </Text>
            <Text style={[styles.tipText, darkMode && styles.textDark]}>
              {tip}
            </Text>
            <TouchableOpacity style={styles.tipButton} onPress={changeTip}>
              <Text style={styles.tipButtonText}>🔄 Refresh Tip</Text>
            </TouchableOpacity>
          </View>

          {/* 🔹 DARK MODE SWITCH */}
          <View style={styles.darkModeSection}>
            <Text style={[styles.darkModeText, darkMode && styles.textDark]}>
              🌙 Dark Mode
            </Text>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              thumbColor={darkMode ? "#fff" : "#ff9100"}
              trackColor={{ true: "#333", false: "#ccc" }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// 🔹 STYLES
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: "#203c58ff",
    justifyContent: "center",
    alignItems: "center",
  },
  glowCircle1: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#ffde9c",
    borderRadius: 150,
    opacity: 0.2,
    top: 60,
    left: 40,
  },
  glowCircle2: {
    position: "absolute",
    width: 350,
    height: 350,
    backgroundColor: "#94560a",
    borderRadius: 175,
    opacity: 0.15,
    bottom: 60,
    right: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(15, 25, 35, 0.8)", // transparent overlay for content
    padding: 20,
    width: "100%",
  },
  containerDark: {
    backgroundColor: "rgba(30, 30, 30, 0.85)",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  headerSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    margin: 5,
  },
  buttonText: {
    color: "#ff9100",
    fontSize: 14,
    fontWeight: "bold",
  },
  quoteSection: { alignItems: "center", marginTop: 30 },
  quote: {
    fontSize: 14,
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  refreshButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  refreshText: { color: "#ff9100", fontWeight: "bold" },
  timerSection: { alignItems: "center", marginTop: 40, marginBottom: 30 },
  timerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  timerText: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  timerHint: {
    fontSize: 14,
    color: "#fff",
    marginTop: 6,
    fontStyle: "italic",
  },
  tipSection: { alignItems: "center", marginTop: 30, marginBottom: 30 },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD166",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  tipButton: {
    backgroundColor: "#FFD166",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  tipButtonText: { color: "#0D1F2D", fontWeight: "bold" },
  darkModeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    marginBottom: 50,
    marginTop: 20,
  },
  darkModeText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  textDark: { color: "#fff" },
});


