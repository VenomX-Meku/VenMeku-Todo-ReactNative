import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ModalScreen() {
  const router = useRouter();
  const [scale] = useState(new Animated.Value(0));
  const [countdown, setCountdown] = useState(5); // auto close timer

  useEffect(() => {
    // Animate pop-in
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();

    // Countdown auto-close
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          router.back();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: "✅ I just completed a task using VenMeku Todo App!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Soft background glow shapes (no blurRadius) */}
      <View style={styles.glowCircle1} pointerEvents="none" />
      <View style={styles.glowCircle2} pointerEvents="none" />

      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.text}>✅ Task saved successfully!</Text>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>📤 Share Success</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Close ({countdown})</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const glowCommon = {
  position: "absolute" as const,
  borderRadius: 999,
  opacity: 0.22,
  // Use transform scaling to make "soft" glow feel like blur substitute
  transform: [{ scale: 1.1 }],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    width: "80%",
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  text: {
    color: "#333",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    width: "100%",
    marginVertical: 15,
  },
  button: {
    backgroundColor: "#94560aff",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: "#e7d1b1",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  shareButtonText: {
    color: "#4a3b24",
    fontWeight: "600",
    fontSize: 15,
  },

  // Glow circle 1 (top-left subtle warm glow)
  glowCircle1: {
    ...glowCommon,
    width: 220,
    height: 220,
    backgroundColor: "#ffde9c",
    top: 90,
    left: 40,
    // Add platform-appropriate shadow to emulate blur
    ...Platform.select({
      ios: { shadowColor: "#ffde9c", shadowOpacity: 0.35, shadowRadius: 30 },
      android: { elevation: 0 },
    }),
  },

  // Glow circle 2 (bottom-right subtle accent)
  glowCircle2: {
    ...glowCommon,
    width: 260,
    height: 260,
    backgroundColor: "#94560aff",
    bottom: 70,
    right: 50,
    ...Platform.select({
      ios: { shadowColor: "#94560aff", shadowOpacity: 0.28, shadowRadius: 36 },
      android: { elevation: 0 },
    }),
  },
});
