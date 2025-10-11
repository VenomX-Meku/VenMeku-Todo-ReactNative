

import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Meku 👋</Text>
      <Text style={styles.subtitle}>Organize your day beautifully 🌟</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/tasks")}
      >
        <Text style={styles.buttonText}>Go to My Tasks</Text>
      </TouchableOpacity>


            {/* NEW BUTTON: Detail Page */}
      {/* I added this so you can navigate to the Detail page */}

      <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/detail")} //Navigate to detail.tsx
      
        ><Text style={styles.buttonText}>Go to detail page</Text>      
        </TouchableOpacity>

{/* NEW BUTTON: Profile Page */}
      {/* Navigate to profile.tsx */} 

      <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/profile")}
      >
        <Text style={styles.buttonText}>Go to profile</Text>
      </TouchableOpacity>


 {/* NEW BUTTON: Settings Page */}
      {/* Navigate to settings.tsx */}
       
       <TouchableOpacity 
       style={styles.button}
       onPress={() => router.push("/settings")}
       >
        <Text style={styles.buttonText}>Go to Settings</Text>
       </TouchableOpacity>
       






      <Text style={styles.quote}>
        “Productivity is never an accident — it’s always the result of a
        commitment to excellence.”
      </Text>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d6912aff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#f9f9f9ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#ff9100",
    fontSize: 16,
    fontWeight: "bold",
  },
  quote: {
    fontSize: 14,
    color: "#fff",
    marginTop: 50,
    fontStyle: "italic",
    textAlign: "center",
  },
});
