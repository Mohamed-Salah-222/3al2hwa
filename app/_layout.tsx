import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="Games" />
        {/* Add other screens */}
      </Stack>
    </SafeAreaProvider>
  );
}
