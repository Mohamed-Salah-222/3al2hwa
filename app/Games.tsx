import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Game = {
  id: number;
  name: string;
  image: any;
  screen: string;
};

const GAMES: Game[] = [
  { id: 1, name: "كلمة السر", image: require("../../assets/password-challenge.png"), screen: "screens/games/PasswordGame" },
  { id: 2, name: "بانك", image: require("../../assets/Bank.png"), screen: "screens/games/BankGame" },
  { id: 3, name: "لبس صاحبك", image: require("../../assets/Bidding.png"), screen: "screens/games/BiddingGame" },
  { id: 4, name: "اوفسايد", image: require("../../assets/offside.png"), screen: "screens/games/OffsideGame" },
  { id: 5, name: "روندو", image: require("../../assets/Rondo.png"), screen: "screens/games/RondoGame" },
  { id: 6, name: "تمثيل", image: require("../../assets/Acting.png"), screen: "screens/games/ActingGame" },
  { id: 7, name: "خمسه في عشرة", image: require("../../assets/5X10.png"), screen: "screens/games/FiveInTenGame" },
  { id: 8, name: "انا مين", image: require("../../assets/whoami.png"), screen: "screens/games/WhoAmIGame" },
  { id: 9, name: "اهبد صح", image: require("../../assets/Ahbd.png"), screen: "screens/games/AhbdGame" },
];

export default function QuickMatchSetup() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleGamePress = (game: Game) => {
    setSelectedGame(game);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>اختار اللعبة</Text>
        </View>

        <View style={styles.grid}>
          {GAMES.map((game) => (
            <TouchableOpacity key={game.id} style={styles.gameSquare} onPress={() => handleGamePress(game)}>
              <View style={styles.imageContainer}>
                <Image source={game.image} style={styles.gameImage} resizeMode="contain" />
              </View>
              <Text style={styles.gameName}>{game.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>{" "}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6d7",
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#a75f4a",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gameSquare: {
    width: "48%",
    marginBottom: 50,
    alignItems: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    marginBottom: -20,
    overflow: "hidden",
  },
  gameImage: {
    width: "100%",
    height: "100%",
  },
  gameName: {
    width: "100%",
    paddingVertical: 36,
    paddingHorizontal: 12,
    borderRadius: 16,
    color: "#a75f4a",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
