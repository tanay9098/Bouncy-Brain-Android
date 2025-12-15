// src/components/Home.tsx
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {router} from "expo-router";
import { styles } from "../styles";

export default function Home() {
  const nav = router;
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Welcome</Text>
        <Text style={styles.small}>Bouncy-Brain. Your ADD/ADHD buddy</Text>
      </View>

      <View style={styles.card}>
        <Text style={{ fontWeight: 700 }}>Get started</Text>
        <Text style={styles.small}>Use Focus Timer to start a Pomodoro or Deep Work session.</Text>
        <TouchableOpacity style={[styles.btn, { marginTop: 12 }]} onPress={() => nav.navigate("Focus" as never)}>
          <Text style={styles.btnText}>Start Focus</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={{ fontWeight: 700 }}>Quick Actions</Text>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity style={[styles.btnSecondary, { padding: 10, marginBottom: 8 }]} onPress={() => nav.navigate("Todo" as never)}>
            <Text>Open Todo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSecondary, { padding: 10, marginBottom: 8 }]} onPress={() => nav.navigate("Mindful" as never)}>
            <Text>Mindfulness</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSecondary, { padding: 10 }]} onPress={() => nav.navigate("Deadline" as never)}>
            <Text>Deadlines</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
