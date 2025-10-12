import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const [user, setUser] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser.name);
          setUserPhoto(parsedUser.photoUri || null);
        }
      } catch (error) {
        console.log("Error loading user:", error);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("user");
  };

  const savePhoto = async (uri: string) => {
    setUserPhoto(uri);
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.photoUri = uri;
      await AsyncStorage.setItem("user", JSON.stringify(parsedUser));
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Permission to access photos is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      savePhoto(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Permission to access camera is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      savePhoto(result.assets[0].uri);
    }
  };

  const handleProfilePress = () => {
    Alert.alert("Profile Photo", "Choose an option", [
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const [quote, setQuote] = useState(
    "Productivity is never an accident — it’s always the result of a commitment to excellence."
  );
  const quotes = [
    "ሕይወት አትጠብቅ እንደሚጀምር፣ አንተ አሁን ጀምር።",
    "ትንሽ ድርጊት በየቀኑ ትልቅ ለውጥ ያመጣል።",
    "እውነት ተንገድ ቢያንስ ትክክለኛ ነው።",
    "ተስፋ ያለብህ እስካለህ ድረስ መንገድ አለ።",
    "ስለ ነገ አትጨነቅ፤ ዛሬን በመልካም ተጠቀም።",
    "የምታስብ ነገር ሁሉ የምታደርገውን ያቀድማል።",
    "በትንሹ መጀመር ትልቅ ነገር እንዲሆን ያደርጋል።",
  ];
  const changeQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const [secondsLeft, setSecondsLeft] = useState(300);
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

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.glowCircle1} />
      <View style={styles.glowCircle2} />

      <View style={[styles.container, darkMode && styles.containerDark]}>
        {/* Dark Mode Switch (Top Right Corner) */}
        <View style={styles.darkModeToggle}>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            thumbColor={darkMode ? "#fff" : "#ff9100"}
            trackColor={{ true: "#333", false: "#ccc" }}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* PROFILE PHOTO */}
          <View style={styles.profileWrapper}>
            {userPhoto ? (
              <TouchableOpacity onPress={handleProfilePress} activeOpacity={0.8}>
                <Image source={{ uri: userPhoto }} style={styles.profilePhotoTopRight} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleProfilePress}
                style={styles.placeholderPhotoTopRight}
                activeOpacity={0.8}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>Add</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* HEADER (moved closer to profile) */}
          <View style={styles.headerSection}>
            <Text style={[styles.title, darkMode && styles.textDark]}>
              Welcome{user ? `, ${user}! 👋` : "!"}
            </Text>

            {user && (
              <TouchableOpacity onPress={logout} style={{ marginTop: 4 }}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/tasks")}>
              <Text style={styles.buttonText}>Tasks</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/detail")}>
              <Text style={styles.buttonText}>Detail</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/profile")}>
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/settings")}>
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>

          {/* TIMER */}
          <View style={styles.timerCircle}>
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
          </View>

          {/* QUOTE */}
          <View style={styles.quoteSection}>
            <Text style={[styles.quote, darkMode && styles.textDark]}>{quote}</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={changeQuote}>
              <Text style={styles.refreshText}>🔄 Refresh Quote</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

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
    backgroundColor: "rgba(15, 25, 35, 0.8)",
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
  darkModeToggle: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  headerSection: {
    marginTop: 10, // 🟢 reduced from 80 to 10 to pull closer
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  profileWrapper: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10, // 🟢 reduced from 30 to 10 for tighter spacing
  },
  profilePhotoTopRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#FFD166",
  },
  placeholderPhotoTopRight: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#888",
    borderWidth: 2,
    borderColor: "#FFD166",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 4 },
  logoutText: { color: "#FFD166", fontWeight: "bold", marginTop: 4 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff9100",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    margin: 5,
  },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#FFD166",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    shadowColor: "#FFD166",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginVertical: 30,
  },
  timerSection: { alignItems: "center" },
  timerTitle: { fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  timerText: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  timerHint: { fontSize: 14, color: "#fff", marginTop: 6, fontStyle: "italic" },
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
  textDark: { color: "#fff" },
});
