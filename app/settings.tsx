import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [language, setLanguage] = useState("English");

  // Toggle between English and Amharic
  const changeLanguage = () => {
    setLanguage((prev) => (prev === "English" ? "Amharic" : "English"));
    Alert.alert("🌍 Language Changed", `Now using ${language === "English" ? "Amharic" : "English"}`);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#1a1a1a" : "#fff5e1" },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: darkMode ? "#fff" : "#94560aff" },
        ]}
      >
        ⚙️ Settings
      </Text>

      {/* Notifications */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: darkMode ? "#fff" : "#333" }]}>
          Notifications
        </Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          thumbColor={notifications ? "#94560aff" : "#f4f3f4"}
          trackColor={{ true: "#caa46d", false: "#ccc" }}
        />
      </View>

      {/* Dark Mode */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: darkMode ? "#fff" : "#333" }]}>
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? "#94560aff" : "#f4f3f4"}
          trackColor={{ true: "#caa46d", false: "#ccc" }}
        />
      </View>

      {/* Private Account */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: darkMode ? "#fff" : "#333" }]}>
          Private Account
        </Text>
        <Switch
          value={privateAccount}
          onValueChange={setPrivateAccount}
          thumbColor={privateAccount ? "#94560aff" : "#f4f3f4"}
          trackColor={{ true: "#caa46d", false: "#ccc" }}
        />
      </View>

      {/* Language Selector */}
      <TouchableOpacity
        style={[
          styles.optionButton,
          { backgroundColor: darkMode ? "#333" : "#fff" },
        ]}
        onPress={changeLanguage}
      >
        <Text style={[styles.optionText, { color: darkMode ? "#fff" : "#333" }]}>
          🌍 Language: <Text style={styles.highlight}>{language}</Text>
        </Text>
      </TouchableOpacity>

      {/* Theme Color Preview */}
      <View style={styles.themePreview}>
        <Text style={[styles.label, { color: darkMode ? "#fff" : "#333" }]}>
          Theme Color
        </Text>
        <View style={styles.colorCircle} />
      </View>

      {/* App Version Info */}
      <View
        style={[
          styles.infoCard,
          { backgroundColor: darkMode ? "#2c2c2c" : "#fff" },
        ]}
      >



<Text
          style={[
            styles.infoText,
            { color: darkMode ? "#bbb" : "#555", fontSize: 40, },
          ]}
        >
          
💻 



        </Text>


 <Text
          style={[
            styles.infoText,
            { color: darkMode ? "#bbb" : "#555" },
          ]}
        >
          

👨‍💻 Developed by: Mekuanint (Meku)


        </Text>




        <Text
          style={[
            styles.infoText,
            { color: darkMode ? "#fff" : "#333" },
          ]}
        >


          📱 App Version: <Text style={styles.highlight}>1.0.0</Text>
        </Text>






<Text
          style={[
            styles.infoText,
            { color: darkMode ? "#bbb" : "#555" },
          ]}
        >
💙 Built with: React Native & TypeScript

        </Text>



<Text
          style={[
            styles.infoText,
            { color: darkMode ? "#bbb" : "#555" },
          ]}
        >
📧 Support: venapp@gmail.com

        </Text>



<Text
          style={[
            styles.infoText,
            { color: darkMode ? "#bbb" : "#555" },
          ]}
        >
© 2025 VenMeku Tech — All rights reserved.

        </Text>





      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
  },
  optionButton: {
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 25,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  highlight: {
    color: "#94560aff",
    fontWeight: "bold",
  },
  themePreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#94560aff",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
