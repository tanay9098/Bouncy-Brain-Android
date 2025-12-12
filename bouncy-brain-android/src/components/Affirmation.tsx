


// src/components/Affirmations.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

type AffirmationHandle = {
  random: () => string;
  messageForContext: (ctx: string) => string;
};

const messages: Record<string, string> = {
  "tab-change": "We notice a tab switch—take a slow breath and come back. Try 30s belly breaths.",
  "day-start": "Good morning — pick 2 focus tasks and start small.",
  "day-end": "You did a lot today. Note one small win — celebrate it.",
  "task-complete": "Nice! Celebrate briefly — fist bump 👊.",
  "task-incomplete": "It’s fine. Break it down smaller and try again.",
};

const Affirmations = forwardRef<AffirmationHandle>((_props, ref) => {
  const [msg, setMsg] = useState<string>("Affirmations");

  useImperativeHandle(ref, () => ({
    random() {
      const arr = Object.values(messages);
      const m = arr[Math.floor(Math.random() * arr.length)];
      setMsg(m);
      return m;
    },
    messageForContext(ctx: string) {
      const m = messages[ctx] || Object.values(messages)[Math.floor(Math.random() * Object.keys(messages).length)];
      setMsg(m);
      return m;
    },
  }));

  return (
    <View style={styles.card}>
      <Text style={{ fontWeight: "700" }}>{msg}</Text>
    </View>
  );
});

export default Affirmations;
