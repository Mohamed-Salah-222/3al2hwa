import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";

type Player = {
  id: string;
  name: string;
};

export default function OffsideGame() {
  const route = useRoute();
  const params = route.params as any;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Game: {params?.gameName}</Text>
      <Text>Team 1: {params?.team1Players?.map((p: Player) => p.name).join(", ")}</Text>
      <Text>Team 2: {params?.team2Players?.map((p: Player) => p.name).join(", ")}</Text>
    </View>
  );
}
