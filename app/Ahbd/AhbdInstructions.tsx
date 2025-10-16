import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AhbdInstructions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>أهبد صح</Text>

      <View style={styles.rulesContainer}>
        <Text style={styles.rule}>• يتم سؤال سؤال إجابته رقم</Text>
        <Text style={styles.rule}>• الفريق الخصم يضع اختياراً غلط</Text>
        <Text style={styles.rule}>• الإجابة الصحيحة = نقطة</Text>
        <Text style={styles.rule}>• اختيار الخصم الغلط = نقطة للفريق الآخر</Text>
        <Text style={styles.rule}>• الإجابة المحايدة لا تؤثر على النقاط</Text>
        <Text style={styles.rule}>• اول فريق يجيب 7 نقط بيكسب</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("./AhbdGame")}>
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
