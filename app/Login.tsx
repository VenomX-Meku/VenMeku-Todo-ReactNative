import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // local state for an auto-closing success banner
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // if banner shown, hide after 1 second and navigate
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    if (showSuccessBanner) {
      t = setTimeout(() => {
        setShowSuccessBanner(false);
        router.replace("/");
      }, 1000); // 1 second
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [showSuccessBanner, router]);

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert("Error", "Please enter both name and password.");
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const foundUser = users.find(
          (u: any) => u.name === name && u.password === password
        );

        if (foundUser) {
          await AsyncStorage.setItem("user", JSON.stringify(foundUser));

          // show in-app auto-closing banner instead of native alert
          setShowSuccessBanner(true);
          // navigation happens from useEffect after 1 second

        } else {
          Alert.alert("Error", "Invalid name or password.");
        }
      } else {
        Alert.alert("Error", "No users found. Please sign up first.");
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Error", "An error occurred during login.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Auto-closing success banner (appears on top) */}
      {showSuccessBanner && (
        <View style={styles.bannerWrapper} pointerEvents="none">
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Logged in successfully!</Text>
          </View>
        </View>
      )}

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Password field with show/hide button inside */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholderTextColor="#666"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showButton}
        >
          <Text style={{ color: "#ff9100", fontWeight: "bold" }}>
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/Signup")}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#203c58ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: Platform.OS === "web" ? 12 : 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  showButton: {
    position: "absolute",
    right: 15,
    padding: 5,
  },
  button: {
    backgroundColor: "#ff9100",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    color: "#FFD166",
    marginTop: 10,
  },

  // banner styles
  bannerWrapper: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
  banner: {
    backgroundColor: "#2e7d32", // green-ish success
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bannerText: {
    color: "#fff",
    fontWeight: "600",
  },
});
