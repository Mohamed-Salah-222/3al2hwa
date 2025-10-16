import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Game = {
  id: number;
  name: string;
  image: any;
  screen: string;
};

const GAMES: Game[] = [
  { id: 1, name: "كلمة السر", image: require("../assets/password-challenge.png"), screen: "Password/PasswordInstructions" },
  { id: 2, name: "بانك", image: require("../assets/Bank.png"), screen: "Bank/BankInstructions" },
  { id: 3, name: "لبس صاحبك", image: require("../assets/Bidding.png"), screen: "Bidding/BiddingInstructions" },
  { id: 4, name: "اوفسايد", image: require("../assets/offside.png"), screen: "Offside/OffsideInstructions" },
  { id: 5, name: "روندو", image: require("../assets/Rondo.png"), screen: "Rondo/RondoInstructions" },
  { id: 6, name: "تمثيل", image: require("../assets/Acting.png"), screen: "Acting/ActingInstructions" },
  { id: 7, name: "خمسه في عشرة", image: require("../assets/5X10.png"), screen: "Five/FiveInstructions" },
  { id: 8, name: "انا مين", image: require("../assets/whoami.png"), screen: "WhoAmI/WhoInstructions" },
  { id: 9, name: "اهبد صح", image: require("../assets/Ahbd.png"), screen: "Ahbd/AhbdInstructions" },
];

export default function QuickMatchSetup() {
  const navigation = useNavigation();

  const handleGamePress = (game: Game) => {
    navigation.navigate(game.screen as never);
  };

  return (
    <View style={styles.container}>
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
      </ScrollView>
    </View>
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
