import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "none", // Changed from 'slide_from_right'
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/SetupScreen" />
    </Stack>
  );
}
