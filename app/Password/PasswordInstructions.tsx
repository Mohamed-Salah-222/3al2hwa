import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PasswordInstructions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>كلمة السر</Text>

      <View style={styles.rulesContainer}>
        <Text style={styles.rule}>• يجب ذكر كلمة واحدة فقط</Text>
        <Text style={styles.rule}>• 30 ثانية لكل فريق</Text>
        <Text style={styles.rule}>• في حالة خطأ يسمح للفريق الآخر بكلمتين</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("./PasswordGame")}>
        <Text style={styles.buttonText}>ابدأ اللعبة</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6d7",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#a75f4a",
    marginBottom: 40,
    textAlign: "center",
  },
  rulesContainer: {
    marginBottom: 40,
    alignItems: "flex-end", // Add this
  },
  rule: {
    fontSize: 16,
    color: "#517c96",
    marginBottom: 15,
    textAlign: "right", // Add this
  },
  button: {
    backgroundColor: "#349aae",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
