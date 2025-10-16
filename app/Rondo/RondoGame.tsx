import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Assuming these are local components/data sources.
// Make sure the import paths are correct for your project structure.
import GameTimer from "../Timer";
import { getRandomWord } from "./RondoData";

export default function PasswordGame() {
  const [currentWord, setCurrentWord] = useState(getRandomWord());

  const handleNextWord = () => {
    setCurrentWord(getRandomWord());
  };

  const handleTimeUp = () => {
    // You can trigger a modal, an alert, or navigate away when time is up.
    console.log("Time is up!");
  };

  return (
    <View style={styles.container}>
      {/* Timer */}
      <View style={styles.timerContainer}>
        <GameTimer initialMinutes={0} initialSeconds={30} onTimeUp={handleTimeUp} />
      </View>

      {/* Word - Middle of page */}
      <View style={styles.wordSection}>
        <View style={styles.wordBox}>
          <Text style={styles.word}>{currentWord}</Text>
        </View>
      </View>

      {/* New Word Button at bottom */}
      <TouchableOpacity style={styles.newWordButton} onPress={handleNextWord}>
        <Text style={styles.newWordButtonText}>New Word</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6d7",
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  timerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  wordSection: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 60,
    marginBottom: 20,
  },
  wordBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 30,
    elevation: 8,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 320,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#a75f4a",
  },
  word: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#a75f4a",
    textAlign: "center",
  },
  newWordButton: {
    backgroundColor: "#349aae",
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: 0,
    width: 320,
    justifyContent: "center",
  },
  newWordButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
