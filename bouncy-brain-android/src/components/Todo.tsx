// src/components/TodoList.tsx
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function Todo() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  async function load() {
    const res = await api.get("/tasks");
    setTasks(res.tasks.filter((t: any) => !t.completed));
  }

  async function add() {
    if (!title.trim()) return;
    await api.post("/tasks", { title });
    setTitle("");
    load();
  }

  async function complete(id: string) {
    await api.put(`/tasks/${id}/complete`, {});
    load();
  }

  async function autoChunk(id: string) {
    await api.post(`/tasks/${id}/auto-chunk`, {});
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="New task" value={title} onChangeText={setTitle} />
      <TouchableOpacity onPress={add}>
        <Text>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text>{item.title}</Text>
            <TouchableOpacity onPress={() => complete(item._id)}>
              <Text>Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => autoChunk(item._id)}>
              <Text>Auto-chunk</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
