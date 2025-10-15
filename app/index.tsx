import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      {/* Logo at top */}
      <Animatable.View animation="zoomIn" duration={600} style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.creditText}>مستوحاة من صباحو تحدي</Text>
      </Animatable.View>

      {/* Start Button in center */}
      <Animatable.View animation="zoomIn" duration={600} style={styles.buttonContainer}>
        <View style={styles.buttonShadow}>
          <TouchableOpacity style={styles.startButton} onPress={() => router.push("/screens/SetupScreen")} activeOpacity={0.8}>
            <Text style={styles.startButtonText}>ابدأ</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>

      {/* Footer at bottom */}
      <Animatable.View animation="zoomIn" duration={600} style={styles.footer}>
        <Image source={require("../assets/Discord.png")} style={styles.socialIcon} resizeMode="contain" />
        <Text style={styles.footerText}>النسخة 1.0</Text>
        <Image source={require("../assets/FaceBook.png")} style={styles.socialIcon} resizeMode="contain" />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6d7",
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 160,
  },
  logo: {
    width: 250,
    height: 250,
  },
  buttonContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonShadow: {
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderRadius: 30,
  },
  startButton: {
    backgroundColor: "#349aae",
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 30,
    marginTop: -225,
  },
  startButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 40,
  },
  socialIcon: {
    width: 45,
    height: 45,
    marginHorizontal: 25,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#a75f4a",
  },
  creditText: {
    fontSize: 14,
    color: "#a75f4a",
    fontWeight: "500",
    position: "absolute",
    bottom: 65, // Adjust this number to move it closer/further from logo
  },
});
