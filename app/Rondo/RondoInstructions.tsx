import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RondoInstructions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>روندو</Text>

      <View style={styles.rulesContainer}>
        <Text style={styles.rule}>• تبدأ اللعبة باسم فلم او مسلسل</Text>
        <Text style={styles.rule}>• ثم يتم قول اسم عمل (مسلسل أو فيلم) قام فيه</Text>
        <Text style={styles.rule}>• ثم اسم ممثل آخر كان في العمل نفسه</Text>
        <Text style={styles.rule}>• ممنوع تكرار العمل</Text>
        <Text style={styles.rule}>• في حالة الإجابة الخاطئة، الفريق يقول Cheating</Text>
        <Text style={styles.rule}>• اول فريق يجيب 5 نقط بيكسب</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("./RondoGame")}>
        <Text style={styles.buttonText}>ابدأ اللعبة</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffe6d7", padding: 20, justifyContent: "center" },
  title: { fontSize: 32, fontWeight: "bold", color: "#a75f4a", marginBottom: 40, textAlign: "center" },
  rulesContainer: { marginBottom: 40, alignItems: "flex-end" },
  rule: { fontSize: 16, color: "#517c96", marginBottom: 15, textAlign: "right" },
  button: { backgroundColor: "#349aae", paddingVertical: 15, borderRadius: 15, alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "#ffffff" },
});
