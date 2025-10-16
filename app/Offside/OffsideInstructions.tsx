import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OffsideInstructions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>أوفسايد</Text>

      <View style={styles.rulesContainer}>
        <Text style={styles.rule}>• الحكم يسأل الفريقين عن اسم بمواصفات خاصة</Text>
        <Text style={styles.rule}>• على كل الأعضاء كتابة اسم يطابق المواصفات في 10 ثواني</Text>
        <Text style={styles.rule}>• نقطة لكل عضو كتب اسماً صحيحاً</Text>
        <Text style={styles.rule}>• إذا كتب عدة أعضاء نفس الاسم، لا يحصلون على نقاط</Text>
        <Text style={styles.rule}>• اول فريق يجيب 10 نقط بيكسب</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("./OffsideGame")}>
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
