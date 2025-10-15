import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function SetupScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <StatusBar hidden={true} />

      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />
      <View style={styles.decorCircle3} />
      <View style={styles.decorCircle4} />

      {/* Dots */}
      <View style={styles.decorDot1} />
      <View style={styles.decorDot2} />
      <View style={styles.decorDot3} />

      <View style={styles.content}>
        {/* Title */}
        <Animatable.Text animation="zoomIn" duration={600} style={styles.title}>
          اختار نوع اللعبة
        </Animatable.Text>

        {/* Quick Match Button */}
        <Animatable.View animation="zoomIn" duration={600}>
          <TouchableOpacity style={styles.modeButton} onPress={() => router.push("/screens/QuickMatchSetup")} activeOpacity={0.8}>
            <Text style={styles.buttonText}>ماتش سريع</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Full Match Button */}
        <Animatable.View animation="zoomIn" duration={600}>
          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => {
              // Navigate to full match setup
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>ماتش كامل</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6d7",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#a75f4a",
    marginBottom: 60,
    marginTop: -80,
    textAlign: "center",
  },
  modeButton: {
    backgroundColor: "#349aae",
    width: 320,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    // elevation: 5,
    // shadowColor: "#a75f4a",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
  },
  buttonText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
  },
  // Circles
  decorCircle1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ffd4b8",
    opacity: 0.3,
    top: -50,
    left: -50,
  },
  decorCircle2: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#a75f4a",
    opacity: 0.1,
    bottom: 100,
    right: -30,
  },
  decorCircle3: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#349aae",
    opacity: 0.15,
    top: "50%",
    right: -20,
  },
  // Dots
  decorDot1: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#a75f4a",
    opacity: 0.3,
    top: 120,
    right: 40,
  },
  decorDot2: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#349aae",
    opacity: 0.3,
    top: 180,
    right: 70,
  },
  decorDot3: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffd4b8",
    opacity: 0.4,
    bottom: 200,
    left: 50,
  },
  decorCircle4: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#349aae",
    opacity: 0.12,
    bottom: 80,
    left: -40,
  },
});
