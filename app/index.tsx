import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const router = useRouter();

    return (
  <View style={styles.container}>
  <Text style={styles.title}>Wellcome, Meku</Text> 
  <Text style={styles.subtitle}>Organize your day butifully</Text> 

    <TouchableOpacity
    style={StyleSheet.button}
    onPress={() => router.push("/tasks")}
    > 
    <Text style={StyleSheet.buttonText}>Go to My Task</Text>
    </TouchableOpacity>
    
    <Text style={Styles.quote}>
        Productivity is never an acccident - it is always the result of a commitment to exellent. do not stop Meku


      </Text>
    </View>
  );
}
  

const style = StyleSheet.create({ 

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBlockColor: "#ffb84d",
        padding: 20,
    },


    title: {
        fontSize: 28,
        fontWeight: "bold",
        color:" #fff",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 30,
    },

})

