// app/whoami/WhoAmIGame.tsx
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GameTimer from "../Timer";
import { getRandomWhoAmIQuestion } from "./WhoData";

interface Question {
  character: string;
  clues: string[];
}

export default function WhoAmIGame() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(getRandomWhoAmIQuestion());
  const [revealedClues, setRevealedClues] = useState<number>(1);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNextQuestion = () => {
    setCurrentQuestion(getRandomWhoAmIQuestion());
    setRevealedClues(1);
    setShowAnswer(false);
  };

  const handleRevealNextClue = () => {
    if (revealedClues < currentQuestion.clues.length) {
      setRevealedClues(revealedClues + 1);
    }
  };

  const handleTimeUp = () => {
    console.log("Time is up!");
  };

  return (
    <View style={styles.container}>
      {/* Timer */}
      <View style={styles.timerSection}>
        <GameTimer initialMinutes={2} initialSeconds={0} onTimeUp={handleTimeUp} />
      </View>

      {/* Clues Section */}
      <ScrollView style={styles.cluesSection} contentContainerStyle={styles.cluesContent}>
        <Text style={styles.questionTitle}>من أنا؟</Text>

        {currentQuestion.clues.slice(0, revealedClues).map((clue, index) => (
          <View key={index} style={styles.clueBox}>
            <Text style={styles.clueNumber}>التلميح {index + 1}</Text>
            <Text style={styles.clueText}>{clue}</Text>
          </View>
        ))}

        {/* Answer Display */}
        {showAnswer && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerLabel}>الإجابة</Text>
            <View style={styles.answerBox}>
              <Text style={styles.answerText}>{currentQuestion.character}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        {/* Next Clue Button */}
        {revealedClues < currentQuestion.clues.length && !showAnswer && (
          <TouchableOpacity style={styles.clueButton} onPress={handleRevealNextClue}>
            <Text style={styles.buttonText}>
              التلميح التالي ({revealedClues}/{currentQuestion.clues.length})
            </Text>
          </TouchableOpacity>
        )}

        {/* Show Answer Button */}
        <TouchableOpacity style={[styles.answerButton, showAnswer && styles.buttonActive]} onPress={() => setShowAnswer(!showAnswer)}>
          <Text style={styles.buttonText}>{showAnswer ? "إخفاء الإجابة" : "إظهار الإجابة"}</Text>
        </TouchableOpacity>

        {/* New Question Button */}
        <TouchableOpacity style={styles.newQuestionButton} onPress={handleNextQuestion}>
          <Text style={styles.newQuestionButtonText}>سؤال جديد</Text>
        </TouchableOpacity>
      </View>
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
  cluesSection: {
    flex: 1,
    marginBottom: 20,
  },
  cluesContent: {
    paddingBottom: 20,
  },
  questionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#349aae",
    textAlign: "center",
    marginBottom: 20,
  },
  clueBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  clueNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#517c96",
    marginBottom: 8,
  },
  clueText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#349aae",
    textAlign: "right",
    lineHeight: 24,
  },
  answerContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  answerLabel: {
    fontSize: 16,
    color: "#517c96",
    marginBottom: 12,
    fontWeight: "600",
  },
  answerBox: {
    backgroundColor: "#a75f4a",
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 20,
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: "center",
  },
  answerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  buttonsContainer: {
    gap: 12,
  },
  clueButton: {
    backgroundColor: "#517c96",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  answerButton: {
    backgroundColor: "#517c96",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  buttonActive: {
    backgroundColor: "#a75f4a",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  newQuestionButton: {
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
