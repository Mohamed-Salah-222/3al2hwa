// app/bank/BankGame.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GameTimer from "../Timer";
import { getRandomBankQuestions } from "./BankData";

export default function BankGame() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  useEffect(() => {
    // Load 12 random questions when component mounts
    const newQuestions = getRandomBankQuestions(12);
    setQuestions(newQuestions);
    setAnsweredQuestions(new Array(12).fill(false));
  }, []);

  const handleCorrectAnswer = () => {
    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);

    // Move to next question if available
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleWrongAnswer = () => {
    // Move to next question without marking as answered
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNewGame = () => {
    const newQuestions = getRandomBankQuestions(12);
    setQuestions(newQuestions);
    setAnsweredQuestions(new Array(12).fill(false));
    setCurrentQuestionIndex(0);
  };

  const handleTimeUp = () => {
    console.log("Time is up!");
  };

  const correctCount = answeredQuestions.filter(Boolean).length;

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Timer */}
      <View style={styles.timerSection}>
        <GameTimer initialMinutes={3} initialSeconds={0} onTimeUp={handleTimeUp} />
      </View>

      {/* Score Display */}
      <View style={styles.scoreSection}>
        <Text style={styles.scoreText}>
          الأسئلة الصحيحة: {correctCount} / {questions.length}
        </Text>
      </View>

      {/* Question Progress */}
      <View style={styles.progressSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.progressContent}>
          {questions.map((_, index) => (
            <TouchableOpacity key={index} style={[styles.progressDot, answeredQuestions[index] && styles.progressDotCorrect, index === currentQuestionIndex && styles.progressDotActive]} onPress={() => setCurrentQuestionIndex(index)}>
              <Text style={[styles.progressDotText, (answeredQuestions[index] || index === currentQuestionIndex) && styles.progressDotTextActive]}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Current Question */}
      <View style={styles.questionSection}>
        <View style={styles.questionBox}>
          <Text style={styles.questionNumber}>السؤال {currentQuestionIndex + 1}</Text>
          <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationSection}>
        <TouchableOpacity style={[styles.navButton, currentQuestionIndex === 0 && styles.navButtonDisabled]} onPress={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          <Text style={styles.navButtonText}>السابق</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navButton, currentQuestionIndex === questions.length - 1 && styles.navButtonDisabled]} onPress={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          <Text style={styles.navButtonText}>التالي</Text>
        </TouchableOpacity>
      </View>

      {/* Answer Buttons */}
      <View style={styles.answerButtonsSection}>
        <TouchableOpacity style={[styles.answerButton, styles.correctButton]} onPress={handleCorrectAnswer}>
          <Text style={styles.answerButtonText}>✓ إجابة صحيحة</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.answerButton, styles.wrongButton]} onPress={handleWrongAnswer}>
          <Text style={styles.answerButtonText}>✗ إجابة خاطئة</Text>
        </TouchableOpacity>
      </View>

      {/* New Game Button */}
      <TouchableOpacity style={styles.newGameButton} onPress={handleNewGame}>
        <Text style={styles.newGameButtonText}>لعبة جديدة</Text>
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
  loadingText: {
    fontSize: 18,
    color: "#349aae",
    textAlign: "center",
    marginTop: 100,
  },
  timerSection: {
    paddingTop: 10,
    paddingBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  scoreSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#349aae",
    textAlign: "center",
  },
  progressSection: {
    marginBottom: 20,
  },
  progressContent: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 4,
  },
  progressDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  progressDotActive: {
    backgroundColor: "#349aae",
    elevation: 4,
  },
  progressDotCorrect: {
    backgroundColor: "#4caf50",
  },
  progressDotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#517c96",
  },
  progressDotTextActive: {
    color: "#fff",
  },
  questionSection: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#517c96",
    marginBottom: 15,
    textAlign: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#349aae",
    textAlign: "center",
    lineHeight: 32,
  },
  navigationSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: "#517c96",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  navButtonDisabled: {
    backgroundColor: "#d3d3d3",
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  answerButtonsSection: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  correctButton: {
    backgroundColor: "#4caf50",
  },
  wrongButton: {
    backgroundColor: "#f44336",
  },
  answerButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },
  newGameButton: {
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
  newGameButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
