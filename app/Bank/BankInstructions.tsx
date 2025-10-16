import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BankInstructions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>بانك</Text>

      <View style={styles.rulesContainer}>
        <Text style={styles.rule}>• اللعبة مكونة من 6 جولات كل جولة 12 سؤال</Text>
        <Text style={styles.rule}>• يمكن للفريق قول bank قبل أي سؤال لحفظ النقاط السابقة</Text>
        <Text style={styles.rule}>• تسلسل النقاط: 1 - 4 - 8 - 16</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("./BankGame")}>
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
