import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function AnimatedSplash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // fade in
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // fade out
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace("/"); // navigate to your main page
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        በጥበብ ያቅዱ ፥ በብሊሃት ይስሩ።
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    color: "#380346ff",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
});
