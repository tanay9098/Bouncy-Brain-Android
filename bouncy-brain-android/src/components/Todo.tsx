// src/components/TodoList.tsx
// src/components/TodoList.tsx
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function Todo() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30");
  const [suggestion, setSuggestion] = useState<string | null>(null);

  async function load() {
    const res = await api.get("/tasks");
    setTasks(res.tasks.filter((t: any) => !t.completed));
  }

  async function add() {
    if (!title.trim()) return;
    await api.post("/tasks", { title, duration: parseInt(duration) });
    setTitle("");
    setDuration("30");
    load();
  }

  async function complete(id: string) {
    await api.put(`/tasks/${id}/complete`, {});
    load();
  }

  async function autoChunk(id: string) {
    const res = await api.post(`/tasks/${id}/auto-chunk`, {});
    setSuggestion(res.suggestion || "Task chunked successfully!");
    load();
  }

  async function suggestPriority() {
    const res = await api.post("/tasks/suggest-priority", {});
    setSuggestion(res.suggestion || "No suggestion available.");
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>AD</Text>
        </View>
        <View>
          <Text style={styles.appTitle}>Bouncy-Brain</Text>
          <Text style={styles.appSubtitle}>Your ADHD/ADD Buddy</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Todo</Text>
        <Text style={styles.pageSubtitle}>
          Add tasks and use AI tools to chunk or suggest priority
        </Text>

        <View style={styles.mainSection}>
          {/* Left Panel - Input & Tasks */}
          <View style={styles.leftPanel}>
            {/* Input Row */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.titleInput}
                placeholder="Task title"
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.durationInput}
                placeholder="30"
                placeholderTextColor="#999"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.addButton} onPress={add}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            {/* AI Suggest Button */}
            <TouchableOpacity
              style={styles.suggestButton}
              onPress={suggestPriority}
            >
              <Text style={styles.suggestButtonText}>AI Suggest Priority</Text>
            </TouchableOpacity>

            {/* Task List */}
            {tasks.length === 0 ? (
              <Text style={styles.emptyText}>No tasks yet</Text>
            ) : (
              <FlatList
                data={tasks}
                keyExtractor={(i) => i._id}
                renderItem={({ item }) => (
                  <View style={styles.taskCard}>
                    <View style={styles.taskInfo}>
                      <Text style={styles.taskTitle}>{item.title}</Text>
                      {item.duration && (
                        <Text style={styles.taskDuration}>
                          {item.duration} min
                        </Text>
                      )}
                    </View>
                    <View style={styles.taskActions}>
                      <TouchableOpacity
                        style={styles.chunkButton}
                        onPress={() => autoChunk(item._id)}
                      >
                        <Text style={styles.chunkButtonText}>Auto-chunk</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.completeButton}
                        onPress={() => complete(item._id)}
                      >
                        <Text style={styles.completeButtonText}>✓</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            )}
          </View>

          {/* Right Panel - AI Suggestion */}
          <View style={styles.rightPanel}>
            <Text style={styles.suggestionTitle}>AI Suggestion</Text>
            <Text style={styles.suggestionText}>
              {suggestion || "No suggestion. Try Auto-chunk on a task."}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1a1a2e",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a2e",
  },
  appSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  mainSection: {
    flexDirection: "row",
    flex: 1,
    gap: 20,
  },
  leftPanel: {
    flex: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  titleInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  durationInput: {
    width: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#3dd9d6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#1a1a2e",
    fontWeight: "600",
    fontSize: 14,
  },
  suggestButton: {
    borderWidth: 1,
    borderColor: "#1a1a2e",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  suggestButtonText: {
    color: "#1a1a2e",
    fontWeight: "500",
    fontSize: 13,
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
    marginTop: 20,
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a2e",
  },
  taskDuration: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  taskActions: {
    flexDirection: "row",
    gap: 8,
  },
  chunkButton: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  chunkButtonText: {
    color: "#2e7d32",
    fontSize: 12,
    fontWeight: "500",
  },
  completeButton: {
    backgroundColor: "#3dd9d6",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 12,
  },
  suggestionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});