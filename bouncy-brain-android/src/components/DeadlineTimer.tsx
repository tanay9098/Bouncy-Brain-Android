// src/components/DeadlineTimer.tsx
import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function DeadlineTimer() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    api.get("/tasks").then(res =>
      setTasks(res.tasks.filter((t: any) => t.dueAt))
    );
  }, []);

  return (
    <FlatList
      data={tasks}
      keyExtractor={i => i._id}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text>{item.title}</Text>
          <Text>{new Date(item.dueAt).toLocaleString()}</Text>
        </View>
      )}
    />
  );
}

