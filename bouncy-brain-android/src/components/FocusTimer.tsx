// src/components/FocusTimer.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import { api } from "../api";

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const timer = useRef<any>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          clearInterval(timer.current);
          complete();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer.current);
  }, []);

  async function complete() {
    await api.post("/sessions", { type: "pomodoro", durationMins: 25 });
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 48 }}>
        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
      </Text>
      <TouchableOpacity onPress={complete}>
        <Text>Finish</Text>
      </TouchableOpacity>
    </View>
  );
}

