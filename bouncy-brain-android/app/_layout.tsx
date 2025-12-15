// app/_layout.tsx
import { Stack } from "expo-router";
import { UserProvider } from "../src/contexts/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </UserProvider>
    </SafeAreaProvider>
  );
}
