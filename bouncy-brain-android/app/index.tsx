// app/index.tsx
import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { UserProvider, useUser } from "../src/contexts/UserContext";
import Home from "../src/components/Home";
import Auth from "../src/components/Auth";
import Dashboard from "../src/components/Dashboard";
import FocusTimer from "../src/components/FocusTimer";
import TodoList from "../src/components/TodoList";
import Mindfulness from "../src/components/Mindfulness";
import DeadlineTimer from "../src/components/DeadlineTimer";
import Calendar from "../src/components/Calendar";

const Stack = createNativeStackNavigator();

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  if (loading) return null; // you can replace with a splash spinner
  if (!user) return <Auth />;
  return <>{children}</>;
}

export default function Index() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home">
              {() => (
                <Protected>
                  <Home />
                </Protected>
              )}
            </Stack.Screen>

            <Stack.Screen name="Dashboard">
              {() => (
                <Protected>
                  <Dashboard />
                </Protected>
              )}
            </Stack.Screen>

            <Stack.Screen name="Focus">
              {() => (
                <Protected>
                  <FocusTimer />
                </Protected>
              )}
            </Stack.Screen>

            <Stack.Screen name="Todo">
              {() => (
                <Protected>
                  <TodoList />
                </Protected>
              )}
            </Stack.Screen>

            <Stack.Screen name="Mindful">
              {() => (
                <Protected>
                  <Mindfulness />
                </Protected>
              )}
            </Stack.Screen>

            <Stack.Screen name="Deadline">
              {() => (
                <Protected>
                  <DeadlineTimer />
                </Protected>
              )}
            </Stack.Screen>

            <Stack.Screen name="Calendar">
              {() => (
                <Protected>
                  <Calendar />
                </Protected>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(Index);
