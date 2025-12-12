// src/components/TodoList.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { api } from "../api";
import { styles } from "../styles";

type Task = {
  _id: string;
  title: string;
  dueAt?: string | null;
  estimateMins?: number;
  completed?: boolean;
  subtasks?: { title: string }[];
};

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [estimate, setEstimate] = useState<number>(30);
  const [aiSuggest, setAiSuggest] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/tasks");
      setTasks((res.tasks || []).filter((t: Task) => !t.completed));
    } catch {
      setTasks([]);
    }
  }

  async function add() {
    try {
      await api.post("/tasks", { title, dueAt: due || null, estimateMins: Number(estimate) });
      setTitle(""); setDue(""); setEstimate(30);
      load();
    } catch {
      Alert.alert("Error", "Could not add task");
    }
  }

  async function complete(id: string) {
    try { await api.put(`/tasks/${id}/complete`, {}); load(); } catch {}
  }

  async function autoChunk(t: Task) {
    try {
      const res = await api.post(`/tasks/${t._id}/auto-chunk`, {});
      setAiSuggest({ task: res.task });
      load();
    } catch {
      Alert.alert("Chunk failed");
    }
  }

  async function aiPrioritize() {
    const ordered = tasks.slice().sort((a, b) => (new Date(a.dueAt || "").getTime() || Infinity) - (new Date(b.dueAt || "").getTime() || Infinity));
    setTasks(ordered);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput style={[styles.input, { flex: 1 }]} placeholder="Task title" value={title} onChangeText={setTitle} />
        </View>

        <View style={{ marginTop: 12, flexDirection: "row", gap: 8, alignItems: "center" }}>
          <TouchableOpacity style={[styles.btn]} onPress={add}>
            <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnSecondary, { padding: 8 }]} onPress={aiPrioritize}><Text>AI Suggest Priority</Text></TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(i) => i._id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: "#f0f6f9", flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700" }}>{item.title}</Text>
                <Text style={styles.small}>{item.dueAt ? new Date(item.dueAt).toLocaleString() : "No due date"}</Text>
                {item.subtasks?.length ? item.subtasks.map((s, i) => <Text key={i} style={styles.small}>• {s.title}</Text>) : null}
              </View>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity style={styles.btn} onPress={() => complete(item._id)}><Text style={styles.btnText}>Complete</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btnSecondary, { marginTop: 8 }]} onPress={() => autoChunk(item)}><Text>Auto-chunk</Text></TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.small}>No tasks yet</Text>}
        />
      </View>

      <View style={styles.card}>
        <Text style={{ fontWeight: 700 }}>AI Suggestion</Text>
        {aiSuggest ? (
          <>
            <Text style={{ fontWeight: 700 }}>{aiSuggest.task.title}</Text>
            {aiSuggest.task.subtasks?.map((s: any, i: number) => <Text key={i} style={styles.small}>• {s.title}</Text>)}
            <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
              <TouchableOpacity style={styles.btn} onPress={() => { setAiSuggest(null); load(); }}><Text style={styles.btnText}>Accept</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.btnSecondary, { marginLeft: 8 }]} onPress={() => setAiSuggest(null)}><Text>Dismiss</Text></TouchableOpacity>
            </View>
          </>
        ) : <Text style={styles.small}>No suggestion. Try Auto-chunk on a task.</Text>}
      </View>
    </View>
  );
}
