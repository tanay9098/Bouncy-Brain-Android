// src/components/DeadlineTimer.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { api } from "../api";
import { styles } from "../styles";

type Task = { _id: string; title: string; dueAt?: string };

export default function DeadlineTimer() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const res = await api.get("/tasks");
      const upcoming = (res.tasks || []).filter((t: Task) => t.dueAt);
      setTasks(upcoming);
    } catch { setTasks([]); }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 6 }}>Deadlines</Text>
      <Text style={styles.small}>Upcoming due dates from your tasks</Text>

      <View style={{ marginTop: 12 }}>
        <FlatList
          data={tasks}
          keyExtractor={(i) => i._id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: "#eee", flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={{ fontWeight: 700 }}>{item.title}</Text>
                <Text style={styles.small}>{new Date(item.dueAt!).toLocaleString()}</Text>
              </View>
              <TouchableOpacity style={[styles.btnSecondary, { alignSelf: "center" }]} onPress={() => Alert.alert("Change Deadline", "Open calendar to change (not implemented)")}>
                <Text>Change Deadline</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.small}>No deadlines found</Text>}
        />
      </View>

      <View style={[styles.card, { marginTop: 12 }]}>
        <Text style={{ fontWeight: 700 }}>Tip</Text>
        <Text style={styles.small}>Add tasks with due dates to see them here or on the Calendar page.</Text>
      </View>
    </View>
  );
}
