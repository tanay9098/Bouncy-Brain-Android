// src/components/Calendar.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";
import { api } from "../api";
import { styles } from "../styles";

export default function Calendar() {
  const [events, setEvents] = useState<{ id: string; title: string; date: string }[]>([]);

  async function load() {
    try {
      const res = await api.get("/tasks");
      const tasks = res.tasks || [];
      setEvents(tasks.filter((t: any) => t.dueAt).map((t: any) => ({ id: t._id, title: t.title, date: new Date(t.dueAt).toISOString().split("T")[0] })));
    } catch { setEvents([]); }
  }

  useEffect(() => { load(); }, []);

  function onDayPress(day: any) {
    Alert.prompt(
      "Task name?",
      undefined,
      [
        {
          text: "Cancel", style: "cancel"
        },
        {
          text: "OK",
          onPress: (text?: string) => {
            if (!text) return;
            api.post("/tasks", { title: text, dueAt: day.dateString });
            load();
          }
        }
      ],
      "plain-text"
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Calendar</Text>
      <Text style={styles.small}>Your tasks in calendar view</Text>

      <View style={{ marginTop: 12 }}>
        <RNCalendar
          onDayPress={onDayPress}
          markedDates={events.reduce((acc, e) => { acc[e.date] = { marked: true }; return acc; }, {} as any)}
        />
      </View>
    </View>
  );
}
