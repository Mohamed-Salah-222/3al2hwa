// GameSetupModal.tsx
import React, { useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Player = {
  id: string;
  name: string;
};

type GameSetupModalProps = {
  visible: boolean;
  gameName: string;
  gameScreen: string; // NEW
  onClose: () => void;
  onStartGame: (judgeName: string, team1Players: Player[], team2Players: Player[]) => void;
};

export default function GameSetupModal({ visible, gameName, gameScreen, onClose, onStartGame }: GameSetupModalProps) {
  const [team1Players, setTeam1Players] = useState<Player[]>([
    { id: "1", name: "" },
    { id: "2", name: "" },
  ]);
  const [team2Players, setTeam2Players] = useState<Player[]>([
    { id: "1", name: "" },
    { id: "2", name: "" },
  ]);
  const [errors, setErrors] = useState<string[]>([]);

  const addPlayer = (team: "team1" | "team2") => {
    if (team === "team1" && team1Players.length < 4) {
      setTeam1Players([...team1Players, { id: String(team1Players.length + 1), name: "" }]);
    } else if (team === "team2" && team2Players.length < 4) {
      setTeam2Players([...team2Players, { id: String(team2Players.length + 1), name: "" }]);
    }
  };

  const removePlayer = (team: "team1" | "team2") => {
    if (team === "team1" && team1Players.length > 2) {
      setTeam1Players(team1Players.slice(0, -1));
    } else if (team === "team2" && team2Players.length > 2) {
      setTeam2Players(team2Players.slice(0, -1));
    }
  };

  const updatePlayerName = (team: "team1" | "team2", id: string, name: string) => {
    if (team === "team1") {
      setTeam1Players(team1Players.map((p) => (p.id === id ? { ...p, name } : p)));
    } else {
      setTeam2Players(team2Players.map((p) => (p.id === id ? { ...p, name } : p)));
    }
  };

  const validateAndStart = () => {
    const newErrors: string[] = [];

    team1Players.forEach((p) => {
      if (!p.name.trim()) {
        newErrors.push(`team1-${p.id}`);
      }
    });

    team2Players.forEach((p) => {
      if (!p.name.trim()) {
        newErrors.push(`team2-${p.id}`);
      }
    });

    setErrors(newErrors);

    if (newErrors.length === 0) {
      onStartGame("", team1Players, team2Players);
      resetForm();
    }
  };

  const resetForm = () => {
    setTeam1Players([
      { id: "1", name: "" },
      { id: "2", name: "" },
    ]);
    setTeam2Players([
      { id: "1", name: "" },
      { id: "2", name: "" },
    ]);
    setErrors([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isFieldError = (fieldId: string) => errors.includes(fieldId);

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={handleClose}>
      <StatusBar hidden={true} backgroundColor="#000" barStyle="light-content" />
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView style={styles.modalContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>{gameName}</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* Team 1 - المراعنة */}
              <View style={[styles.teamSection, styles.team1Section]}>
                <Text style={[styles.teamTitle, styles.team1Title]}>المراعنة</Text>

                {/* Render players in rows of 2 */}
                {Array.from({ length: Math.ceil(team1Players.length / 2) }).map((_, rowIndex) => (
                  <View key={rowIndex} style={styles.playersRow}>
                    {team1Players.slice(rowIndex * 2, rowIndex * 2 + 2).map((player, index) => (
                      <TextInput key={player.id} style={[styles.playerInput, styles.team1Input, isFieldError(`team1-${player.id}`) && styles.inputError]} placeholder={`Player ${rowIndex * 2 + index + 1}`} placeholderTextColor="#91c4d4" value={player.name} onChangeText={(text) => updatePlayerName("team1", player.id, text)} />
                    ))}
                  </View>
                ))}

                <View style={styles.teamButtons}>
                  <TouchableOpacity style={[styles.playerButton, styles.team1Button, team1Players.length >= 4 && styles.buttonDisabled]} onPress={() => addPlayer("team1")} disabled={team1Players.length >= 4}>
                    <Text style={styles.playerButtonText}>+ إضافة لاعب</Text>
                  </TouchableOpacity>
                  {team1Players.length > 2 && (
                    <TouchableOpacity style={[styles.playerButton, styles.team1ButtonRemove]} onPress={() => removePlayer("team1")}>
                      <Text style={styles.playerButtonText}>✕ حذف لاعب</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Team 2 - النصايحة */}
              <View style={[styles.teamSection, styles.team2Section]}>
                <Text style={[styles.teamTitle, styles.team2Title]}>النصايحة</Text>

                {/* Render players in rows of 2 */}
                {Array.from({ length: Math.ceil(team2Players.length / 2) }).map((_, rowIndex) => (
                  <View key={rowIndex} style={styles.playersRow}>
                    {team2Players.slice(rowIndex * 2, rowIndex * 2 + 2).map((player, index) => (
                      <TextInput key={player.id} style={[styles.playerInput, styles.team2Input, isFieldError(`team2-${player.id}`) && styles.inputError]} placeholder={`Player ${rowIndex * 2 + index + 1}`} placeholderTextColor="#f5b5b5" value={player.name} onChangeText={(text) => updatePlayerName("team2", player.id, text)} />
                    ))}
                  </View>
                ))}

                <View style={styles.teamButtons}>
                  <TouchableOpacity style={[styles.playerButton, styles.team2Button, team2Players.length >= 4 && styles.buttonDisabled]} onPress={() => addPlayer("team2")} disabled={team2Players.length >= 4}>
                    <Text style={styles.playerButtonText}>+ إضافة لاعب</Text>
                  </TouchableOpacity>
                  {team2Players.length > 2 && (
                    <TouchableOpacity style={[styles.playerButton, styles.team2ButtonRemove]} onPress={() => removePlayer("team2")}>
                      <Text style={styles.playerButtonText}>✕ حذف لاعب</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>

            {/* Start Button - hanging outside */}
            <TouchableOpacity style={styles.startButton} onPress={validateAndStart}>
              <Text style={styles.startButtonText}>ابدأ اللعبة</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  modalContainer: {
    width: "100%",
    maxHeight: "90%",
  },
  modalContent: {
    backgroundColor: "#f8d7c1",
    borderRadius: 20,
    position: "relative",
    borderWidth: 3,
    borderColor: "#a75f4a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a75f4a",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    top: 16,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 28,
    color: "#a75f4a",
    fontWeight: "bold",
  },
  content: {
    padding: 16,
    maxHeight: 550,
  },
  teamSection: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
  },
  team1Section: {
    backgroundColor: "#e0f2f7",
    borderColor: "#3498db",
  },
  team2Section: {
    backgroundColor: "#ffe0e0",
    borderColor: "#e74c3c",
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  team1Title: {
    color: "#2c3e50",
  },
  team2Title: {
    color: "#c0392b",
  },
  playersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
  playerInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    flex: 1,
    borderWidth: 2,
    textAlign: "left",
  },
  team1Input: {
    borderColor: "#3498db",
    color: "#2c3e50",
  },
  team2Input: {
    borderColor: "#e74c3c",
    color: "#c0392b",
  },
  inputError: {
    borderColor: "#e74c3c",
    borderWidth: 3,
    backgroundColor: "#ffe0e0",
  },
  teamButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    gap: 8,
  },
  playerButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  team1Button: {
    backgroundColor: "#3498db",
  },
  team1ButtonRemove: {
    backgroundColor: "#95a5a6",
  },
  team2Button: {
    backgroundColor: "#e74c3c",
  },
  team2ButtonRemove: {
    backgroundColor: "#95a5a6",
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
    opacity: 0.5,
  },
  playerButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "#349aae",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: -30,
    zIndex: 999,
    elevation: 10,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
