import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getRandomWord } from "../../data/PasswordData";
import InstructionsModal from "../../modals/InstructionsModal";

const PASSWORD_RULES = ["يجب ذكر كلمة واحدة فقط", "30 ثانية لكل فريق لذكر الدليل وسماع الاجابة", "في حالة ذكر كلمتين او اسم مركب يسمح للفريق الاخر بكلمتين"];

export default function PasswordGame() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse the parameters safely
  let team1Players = [];
  let team2Players = [];

  try {
    if (typeof params.team1Players === "string") {
      team1Players = JSON.parse(params.team1Players);
    } else if (Array.isArray(params.team1Players)) {
      team1Players = params.team1Players;
    }

    if (typeof params.team2Players === "string") {
      team2Players = JSON.parse(params.team2Players);
    } else if (Array.isArray(params.team2Players)) {
      team2Players = params.team2Players;
    }
  } catch (error) {
    console.log("Error parsing players:", error);
  }

  const gameName = params.gameName as string;

  const teams = [
    { name: "المراعنة", players: team1Players },
    { name: "النصايحة", players: team2Players },
  ];

  const [showInstructions, setShowInstructions] = useState(true);
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const handleStartGame = () => {
    setGameStarted(true);
    setCurrentWord(getRandomWord());
  };

  const handleNextRound = () => {
    setCurrentWord(getRandomWord());
  };

  const isGameFinished = team1Score === 4 || team2Score === 4;

  const handleFinish = () => {
    const winningTeam = team1Score === 4 ? teams[0].name : teams[1].name;
    setWinner(winningTeam);
  };

  const handleReturnHome = () => {
    router.push("/");
  };

  if (winner) {
    return (
      <View style={styles.container}>
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>فاز الفريق</Text>
          <Text style={styles.winnerName}>{winner}</Text>
          <TouchableOpacity style={styles.returnButton} onPress={handleReturnHome}>
            <Text style={styles.returnButtonText}>رجوع</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <InstructionsModal visible={showInstructions} title="كلمة السر" rules={PASSWORD_RULES} onClose={() => setShowInstructions(false)} />

      {!gameStarted ? (
        <View style={styles.setupContainer}>
          <Text style={styles.setupTitle}>هيا بنا نبدأ!</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
            <Text style={styles.startButtonText}>ابدأ اللعبة</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          {/* Score Display */}
          <View style={styles.scoreContainer}>
            <View style={styles.teamScore}>
              <Text style={styles.teamName}>{teams[0].name}</Text>
              <Text style={styles.score}>{team1Score}</Text>
            </View>
            <Text style={styles.separator}>-</Text>
            <View style={styles.teamScore}>
              <Text style={styles.teamName}>{teams[1].name}</Text>
              <Text style={styles.score}>{team2Score}</Text>
            </View>
          </View>

          {/* Word Display */}
          <View style={styles.wordContainer}>
            <Text style={styles.wordLabel}>الكلمة</Text>
            <Text style={styles.word}>{currentWord}</Text>
          </View>

          {/* Score Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.scoreButton} onPress={() => setTeam1Score(team1Score + 1)}>
              <Text style={styles.scoreButtonText}>{teams[0].name} +</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.scoreButton} onPress={() => setTeam2Score(team2Score + 1)}>
              <Text style={styles.scoreButtonText}>{teams[1].name} +</Text>
            </TouchableOpacity>
          </View>

          {/* Next Round Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNextRound}>
            <Text style={styles.nextButtonText}>الجولة التالية</Text>
          </TouchableOpacity>

          {/* Finish Button - Only available if someone has 4 points */}
          {isGameFinished && (
            <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
              <Text style={styles.finishButtonText}>إنهاء اللعبة</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6d7",
  },
  setupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  setupTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#a75f4a",
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: "#349aae",
    paddingHorizontal: 50,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  gameContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  teamScore: {
    alignItems: "center",
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    color: "#a75f4a",
    fontWeight: "bold",
    marginBottom: 8,
  },
  score: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#349aae",
  },
  separator: {
    fontSize: 32,
    color: "#a75f4a",
    marginHorizontal: 20,
  },
  wordContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  wordLabel: {
    fontSize: 14,
    color: "#517c96",
    marginBottom: 10,
  },
  word: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#349aae",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 10,
  },
  scoreButton: {
    flex: 1,
    backgroundColor: "#349aae",
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  scoreButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  nextButton: {
    backgroundColor: "#517c96",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  finishButton: {
    backgroundColor: "#a75f4a",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  winnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  winnerText: {
    fontSize: 32,
    color: "#a75f4a",
    marginBottom: 20,
  },
  winnerName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#349aae",
    marginBottom: 40,
  },
  returnButton: {
    backgroundColor: "#349aae",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#a75f4a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  returnButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
