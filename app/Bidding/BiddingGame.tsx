// app/ahbd/AhbdGame.tsx
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GameTimer from "../Timer";
import { getRandomBetYourPartnerQuestion } from "./BiddingData";

interface Question {
  question: string;
  answerCeiling: number;
}

export default function AhbdGame() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(getRandomBetYourPartnerQuestion());

  const handleNextQuestion = () => {
    setCurrentQuestion(getRandomBetYourPartnerQuestion());
  };

  const handleTimeUp = () => {
    console.log("Time is up!");
  };

  return (
    <View style={styles.container}>
      {/* Timer */}
      <View style={styles.timerSection}>
        <GameTimer initialMinutes={0} initialSeconds={30} onTimeUp={handleTimeUp} />
      </View>

      {/* Question - Middle of page */}
      <View style={styles.questionSection}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>
      </View>

      {/* Answer Display - Always visible */}
      <View style={styles.answerContainer}>
        <Text style={styles.answerLabel}>الإجابة</Text>
        <View style={styles.answerBox}>
          <Text style={styles.answerText}>{currentQuestion.answerCeiling}</Text>
        </View>
      </View>

      {/* New Question Button at bottom */}
      <TouchableOpacity style={styles.newQuestionButton} onPress={handleNextQuestion}>
        <Text style={styles.newQuestionButtonText}>سؤال جديد</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6d7",
    padding: 20,
  },
  timerSection: {
    paddingTop: 10,
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  questionSection: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -155 }, { translateY: -120 }],
    width: 310,
  },
  questionBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 30,
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#349aae",
    textAlign: "center",
    lineHeight: 28,
  },
  answerContainer: {
    position: "absolute",
    top: "68%",
    left: "50%",
    transform: [{ translateX: -100 }],
    alignItems: "center",
  },
  answerLabel: {
    fontSize: 14,
    color: "#517c96",
    marginBottom: 10,
    fontWeight: "500",
  },
  answerBox: {
    backgroundColor: "#a75f4a",
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingVertical: 15,
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: "center",
  },
  answerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  newQuestionButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#349aae",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  newQuestionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
