import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WhoAmIInstructions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>أنا مين</Text>

      <View style={styles.rulesContainer}>
        <Text style={styles.rule}>• هناك 5 أدلة لكل شخص</Text>
        <Text style={styles.rule}>• يتم لعب 3 جولات</Text>
        <Text style={styles.rule}>• في حالة تخمين اسم خاطئ، تنتقل الأفضلية للفريق الآخر</Text>
        <Text style={styles.rule}>• الفريق الآخر يسمع الدليل التالي ويحاول التخمين</Text>
        <Text style={styles.rule}>• اول فريق يجيب 3 نقط بيكسب</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("./WhoAmIGame")}>
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
