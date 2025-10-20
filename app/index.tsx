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
  const [darkMode, setDarkMode] = useState(false);
  const [quote, setQuote] = useState(
    "Productivity is never an accident — it’s always the result of a commitment to excellence."
  );
  const [secondsLeft, setSecondsLeft] = useState(300);

  // Load session user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser.name || null);
          setUserPhoto(parsedUser.photoUri || null);
        } else {
          // no session -> go to login
          setTimeout(() => router.replace("/Login"), 500);
        }
      } catch (error) {
        console.log("Error loading user:", error);
      }
    };
    fetchUser();
  }, [router]);

  // Timer countdown
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

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

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

  // LOGOUT
  // Keep users list intact and only remove the session key "user".
  // This preserves saved user data (including photoUri) for future logins.
  const logout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // Remove only the session key; keep the users array and user data intact.
              await AsyncStorage.removeItem("user");
              setUser(null);
              setUserPhoto(null);
              // Navigate to Login
              router.replace("/Login");
            } catch (error) {
              console.log("Logout error:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // SAVE PHOTO
  // Update both the session `user` object and the `users` list (if exists).
  // This ensures the photo is persisted across logins and logouts.
  const savePhoto = async (uri: string) => {
    setUserPhoto(uri);
    try {
      // Update session user (if present)
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const updatedSessionUser = { ...parsedUser, photoUri: uri };
        await AsyncStorage.setItem("user", JSON.stringify(updatedSessionUser));
      }

      // Update users list (so photo persists for next login)
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers) as any[];
        // If we have a logged-in name, update that user's photo; else try match by session
        const currentName = storedUser ? JSON.parse(storedUser).name : user;
        if (currentName) {
          const idx = users.findIndex((u) => u.name === currentName);
          if (idx !== -1) {
            users[idx].photoUri = uri;
            await AsyncStorage.setItem("users", JSON.stringify(users));
            return;
          }
        }
        // If no matching name found, optionally add/update the first user entry
        // (This is conservative and won't delete existing accounts)
        if (users.length > 0) {
          users[0].photoUri = users[0].photoUri || uri;
          await AsyncStorage.setItem("users", JSON.stringify(users));
        } else {
          // create a users array with the photo if none existed
          const newUser = { name: user || "Guest", password: "", photoUri: uri };
          await AsyncStorage.setItem("users", JSON.stringify([newUser]));
        }
      } else {
        // No users array yet — create one with current session (if present) or a guest record
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          const u = { name: parsed.name || "Guest", password: parsed.password || "", photoUri: uri };
          await AsyncStorage.setItem("users", JSON.stringify([u]));
        } else {
          const u = { name: user || "Guest", password: "", photoUri: uri };
          await AsyncStorage.setItem("users", JSON.stringify([u]));
        }
      }
    } catch (error) {
      console.log("Error saving photo:", error);
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
    if (!result.canceled && result.assets?.length) {
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
    if (!result.canceled && result.assets?.length) {
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

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.glowCircle1} />
      <View style={styles.glowCircle2} />

      <View style={[styles.container, darkMode && styles.containerDark]}>
        <View style={styles.darkModeToggle}>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            thumbColor={darkMode ? "#fff" : "#ff9100"}
            trackColor={{ true: "#333", false: "#ccc" }}
          />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileWrapper}>
            {userPhoto ? (
              <TouchableOpacity onPress={handleProfilePress}>
                <Image source={{ uri: userPhoto }} style={styles.profilePhotoTopRight} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.placeholderPhotoTopRight}
                onPress={handleProfilePress}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>Add</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={[styles.title, darkMode && styles.textDark]}>
            Welcome{user ? `, ${user}! 👋` : "!"}
          </Text>

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

          <View style={styles.timerCircle}>
            <Text style={[styles.timerText, darkMode && styles.textDark]}>
              {formatTime(secondsLeft)}
            </Text>
          </View>

          <View style={styles.quoteSection}>
            <Text style={[styles.quote, darkMode && styles.textDark]}>{quote}</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={changeQuote}>
              <Text style={styles.refreshText}>🔄 Refresh Quote</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: { flex: 1, backgroundColor: "#183d75ff", justifyContent: "center", alignItems: "center" },
  glowCircle1: { position: "absolute", width: 300, height: 300, backgroundColor: "#ffde9c", borderRadius: 150, opacity: 0.2, top: 60, left: 40 },
  glowCircle2: { position: "absolute", width: 350, height: 350, backgroundColor: "#94560a", borderRadius: 175, opacity: 0.15, bottom: 60, right: 40 },
  container: { flex: 1, backgroundColor: "rgba(76, 56, 21, 0.8)", width: "100%", padding: 20 },
  containerDark: { backgroundColor: "rgba(30,30,30,0.85)" },
  scrollContent: { flexGrow: 1, alignItems: "center", paddingBottom: 50 },
  darkModeToggle: { position: "absolute", top: 40, right: 20, zIndex: 10 },
  profileWrapper: { marginTop: 20, marginBottom: 10 },
  profilePhotoTopRight: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: "#FFD166" },
  placeholderPhotoTopRight: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#888", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "#FFD166" },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  textDark: { color: "#fff" },
  buttonRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginBottom: 20 },
  button: { backgroundColor: "#ff9100", padding: 8, paddingHorizontal: 12, borderRadius: 15, margin: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  timerCircle: { width: 150, height: 150, borderRadius: 75, borderWidth: 4, borderColor: "#FFD166", justifyContent: "center", alignItems: "center", marginVertical: 20 },
  timerText: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  quoteSection: { alignItems: "center", marginVertical: 20 },
  quote: { fontStyle: "italic", textAlign: "center", color: "#fff", marginHorizontal: 10, marginBottom: 10 },
  refreshButton: { backgroundColor: "#ff9100", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10 },
  refreshText: { color: "#fff", fontWeight: "bold" },
  logoutButton: { backgroundColor: "#d32f2f", padding: 10, borderRadius: 15, marginTop: 20 },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 14 },


  
});


