// src/components/FocusTimer.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Affirmations from "./Affirmation";
import { api } from "../api";
import { styles } from "../styles";

const MODES = {
  pomodoro: { work: 25, brk: 5, label: "Pomodoro" },
  deep: { work: 50, brk: 10, label: "Deep Work" },
  deadline: { work: 30, brk: 5, label: "Deadline" },
};

export default function FocusTimer() {
  const [mode, setMode] = useState<keyof typeof MODES>("pomodoro");
  const [workMins, setWorkMins] = useState(MODES.pomodoro.work);
  const [breakMins, setBreakMins] = useState(MODES.pomodoro.brk);
  const [isWork, setIsWork] = useState(true);
  const [seconds, setSeconds] = useState(workMins * 60);
  const [active, setActive] = useState(false);
  const intervalRef = useRef<any>(null);
  const affirmRef = useRef<any>(null);

  useEffect(() => setSeconds((isWork ? workMins : breakMins) * 60), [workMins, breakMins, isWork]);

  useEffect(() => {
    if (active && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds((s: number) => s - 1), 1000);
    } else if (seconds === 0 && active) {
      clearInterval(intervalRef.current);
      setActive(false);
      completeSession();
    }
    return () => clearInterval(intervalRef.current);
  }, [active, seconds]);

  useEffect(() => {
    if (mode === "pomodoro") { setWorkMins(25); setBreakMins(5); }
    if (mode === "deadline") { setWorkMins(30); setBreakMins(5); }
  }, [mode]);

  async function completeSession() {
    if (affirmRef.current) affirmRef.current.messageForContext("task-complete");
    Alert.alert("Session complete", "Nicely done.");
    try { await api.post("/sessions", { type: mode, durationMins: isWork ? workMins : breakMins }); } catch {}
  }

  function toggle() { setActive(a => !a); }
  function reset() { setActive(false); setSeconds((isWork ? workMins : breakMins) * 60); }
  function fmt(s: number) { const m = Math.floor(s / 60); const ss = s % 60; return `${m}:${ss < 10 ? "0" + ss : ss}`; }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Bouncy Brain</Text>
        <Text style={styles.small}>Soft pastel timer for calm sessions</Text>
      </View>

      <View style={styles.card}>
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
          {Object.keys(MODES).map(k => (
            <TouchableOpacity key={k} onPress={() => setMode(k as any)} style={{ padding: 8, borderRadius: 8, backgroundColor: mode === k ? "#e0f2ff" : "transparent" }}>
              <Text style={{ fontWeight: "600" }}>{(MODES as any)[k].label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.timerLarge}>
          <Text style={{ fontSize: 48 }}>{fmt(seconds)}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
          <TouchableOpacity style={styles.btn} onPress={toggle}><Text style={styles.btnText}>{active ? "Pause" : "Start"}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={reset}><Text>Reset</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => { setIsWork(w => !w); setSeconds((!isWork ? workMins : breakMins) * 60); }}><Text>Switch</Text></TouchableOpacity>
        </View>
      </View>

      <View style={[styles.card, { marginTop: 12 }]}>
        <Text style={{ fontWeight: 700 }}>Affirmation</Text>
        <Affirmations ref={affirmRef} />
      </View>
    </View>
  );
}
