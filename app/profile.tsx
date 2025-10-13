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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load user data from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setName(parsed.name || "");
          setEmail(parsed.email || "");
          setPhotoUri(parsed.photoUri || null);
        }
      } catch (err) {
        console.log("Error loading user:", err);
      }
    };
    loadUser();
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Access to photos is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Access to camera is needed.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert("⚠️ Error", "Name and Email cannot be empty.");
      return;
    }

    try {
      const userData = {
        name: name.trim(),
        email: email.trim(),
        photoUri: photoUri,
      };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setName(userData.name);
      setEmail(userData.email);
      setPhotoUri(userData.photoUri);

      Alert.alert("✅ Saved", "Your profile changes have been saved!");
    } catch (error) {
      console.log("Error saving profile:", error);
      Alert.alert("❌ Error", "Failed to save profile changes.");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      Alert.alert("Logged Out", "You have been logged out successfully!");
      router.replace("/");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const handleChangePhoto = () => {
    Alert.alert("Profile Photo", "Choose an option", [
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.glowCircle1} />
      <View style={styles.glowCircle2} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.darkModeToggle}>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            thumbColor={darkMode ? "#fff" : "#ff9100"}
            trackColor={{ true: "#333", false: "#ccc" }}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Picture */}
        <TouchableOpacity
          style={styles.photoWrapper}
          onPress={handleChangePhoto}
          activeOpacity={0.8}
        >
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <View style={styles.placeholderPhoto}>
              <Text style={{ color: "#fff" }}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Info Section: Name and Email Side by Side */}
        <View style={styles.infoSectionHorizontal}>
          <View style={styles.inputWrapper}>
            <Text style={[styles.label, darkMode && styles.textDark]}>Name</Text>
            <TextInput
              style={[styles.input, darkMode && styles.inputDark]}
              placeholder="Enter your name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={[styles.label, darkMode && styles.textDark]}>Email</Text>
            <TextInput
              style={[styles.input, darkMode && styles.inputDark]}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Buttons at bottom */}
        <View style={styles.buttonsBottom}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>💾 Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#203c58ff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: {
    backgroundColor: "#1a1a1a",
  },
  glowCircle1: {
    position: "absolute",
    width: 250,
    height: 250,
    backgroundColor: "#ffde9c",
    borderRadius: 125,
    opacity: 0.15,
    top: 60,
    left: 40,
  },
  glowCircle2: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#94560a",
    borderRadius: 150,
    opacity: 0.1,
    bottom: 60,
    right: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 50,
  },
  backText: { color: "#FFD166", fontSize: 16, fontWeight: "bold" },
  darkModeToggle: { marginLeft: 10 },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 50,
    justifyContent: "space-between",
    flexGrow: 1,
  },
  photoWrapper: {
    marginTop: 40,
    marginBottom: 40, // pull text field slightly down
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#FFD166",
  },
  placeholderPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFD166",
  },
  infoSectionHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 40, // push buttons down
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 15,
  },
  inputDark: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  buttonsBottom: {
    width: "85%",
    marginBottom: 100, // bottom space
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#ff9100",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 15,
    width: "70%",
    marginBottom: 25,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 20,
    width: "60%",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  }, 
  textDark: { color: "#fff" },
});   