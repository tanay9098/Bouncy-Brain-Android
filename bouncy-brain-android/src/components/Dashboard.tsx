// src/components/Dashboard.tsx
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [daily, setDaily] = useState<any>({});

  useEffect(() => {
    api.get("/stats/daily").then(setDaily);
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text>Tasks Completed: {daily.tasksCompleted || 0}</Text>
      <Text>Focus Minutes: {daily.totalSessionMins || 0}</Text>
    </View>
  );
}
