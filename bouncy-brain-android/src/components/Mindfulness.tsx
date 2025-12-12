// src/components/Mindfulness.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Affirmations from "./Affirmation";
import { styles } from "../styles";

const MODES = {
  belly: { label: "Belly breathing", steps: ["Breathe in", "Breathe out"], ms: 4000 },
  box: { label: "Box breathing", steps: ["Inhale 4", "Hold 4", "Exhale 4", "Hold 4"], ms: 4000 },
  guided: { label: "Guided (audio)", steps: ["Listen & relax"], ms: 60000 },
};

export default function Mindfulness() {
  const [mode, setMode] = useState<keyof typeof MODES>("belly");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const timerRef = useRef<any>(null);
  const affirmRef = useRef<any>(null);

  useEffect(() => {
    if (!running) { clearInterval(timerRef.current); return; }
    const cfg = MODES[mode];
    timerRef.current = setInterval(() => {
      setStep(s => {
        const next = s + 1;
        if (next >= cfg.steps.length) {
          if (mode === "guided") { setRunning(false); if (affirmRef.current) affirmRef.current.messageForContext("task-complete"); return 0; }
          return 0;
        }
        return next;
      });
    }, cfg.ms);
    return () => clearInterval(timerRef.current);
  }, [running, mode]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Mindfulness</Text>
        <Text style={styles.small}>Short practices to reset your attention.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.small}>Mode</Text>
        <View style={{ marginTop: 8 }}>
          {Object.keys(MODES).map(k => (
            <TouchableOpacity key={k} onPress={() => setMode(k as any)} style={{ padding: 8 }}>
              <Text style={{ fontWeight: 700 }}>{(MODES as any)[k].label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>{MODES[mode].steps[step % MODES[mode].steps.length]}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity style={styles.btn} onPress={() => setRunning(true)}><Text style={styles.btnText}>Start</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={() => setRunning(false)}><Text>Stop</Text></TouchableOpacity>
        </View>
      </View>

      <View style={[styles.card, { marginTop: 12 }]}>
        <Text style={{ fontWeight: 700 }}>Affirmation</Text>
        <Affirmations ref={affirmRef} />
      </View>
    </View>
  );
}
