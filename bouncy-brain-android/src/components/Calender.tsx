// src/components/Calender.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, Modal, TextInput } from "react-native";
import { Calendar as RNCalendar, DateData } from "react-native-calendars";
import { api } from "../api";
import { styles, tokens } from "../styles";

interface Task {
  _id: string;
  title: string;
  dueAt: string;
}

interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
  };
}

export default function Calendar() {
  const [events, setEvents] = useState<Task[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [addingForDate, setAddingForDate] = useState<string>("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/tasks");
      const tasks = res.tasks || [];
      const tasksWithDates = tasks.filter((t: Task) => t.dueAt);

      setEvents(tasksWithDates);

      // Create marked dates object
      const marked: MarkedDates = {};
      tasksWithDates.forEach((t: Task) => {
        const date = new Date(t.dueAt).toISOString().split("T")[0];
        marked[date] = {
          marked: true,
          dotColor: tokens.accent1,
        };
      });
      setMarkedDates(marked);
    } catch {
      setEvents([]);
      setMarkedDates({});
    }
  }

  function handleDayPress(day: DateData) {
    setSelectedDate(day.dateString);

    // Find tasks for this date
    const tasksForDate = events.filter((t) => {
      const taskDate = new Date(t.dueAt).toISOString().split("T")[0];
      return taskDate === day.dateString;
    });

    setSelectedTasks(tasksForDate);

    // Update marked dates to show selection
    const newMarked = { ...markedDates };
    Object.keys(newMarked).forEach((date) => {
      newMarked[date] = { ...newMarked[date], selected: false };
    });
    newMarked[day.dateString] = {
      ...newMarked[day.dateString],
      selected: true,
      selectedColor: tokens.accent2,
    };
    setMarkedDates(newMarked);
  }

  function handleAddTask(date: string) {
    setAddingForDate(date);
    setNewTaskTitle("");
    setShowAddModal(true);
  }

  async function createTask() {
    if (!newTaskTitle.trim()) {
      Alert.alert("Error", "Please enter a task name");
      return;
    }

    try {
      await api.post("/tasks", {
        title: newTaskTitle,
        dueAt: addingForDate,
      });
      setShowAddModal(false);
      setNewTaskTitle("");
      load();
    } catch {
      Alert.alert("Error", "Could not create task");
    }
  }

  async function updateTaskDate(taskId: string) {
    Alert.prompt(
      "Update deadline",
      "Enter new date (YYYY-MM-DD)",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Update",
          onPress: async (newDate) => {
            if (!newDate) return;
            try {
              await api.put(`/tasks/${taskId}`, { dueAt: newDate });
              load();
            } catch {
              Alert.alert("Error", "Could not update task");
            }
          },
        },
      ],
      "plain-text",
      selectedDate || undefined
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Calendar</Text>
        <Text style={styles.small}>Your tasks in calendar view</Text>
      </View>

      {/* Calendar */}
      <View style={styles.card}>
        <RNCalendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: tokens.muted,
            selectedDayBackgroundColor: tokens.accent2,
            selectedDayTextColor: tokens.text,
            todayTextColor: tokens.accent1,
            dayTextColor: tokens.text,
            textDisabledColor: "#d9e1e8",
            dotColor: tokens.accent1,
            selectedDotColor: "#ffffff",
            arrowColor: tokens.text,
            monthTextColor: tokens.text,
            textDayFontWeight: "500",
            textMonthFontWeight: "700",
            textDayHeaderFontWeight: "600",
          }}
        />
      </View>

      {/* Selected Date Info */}
      {selectedDate && (
        <View style={[styles.card, { marginTop: 12 }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontWeight: "700", fontSize: 16 }}>
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
            <TouchableOpacity
              style={[styles.btn, { paddingVertical: 8, paddingHorizontal: 12 }]}
              onPress={() => handleAddTask(selectedDate)}
            >
              <Text style={[styles.btnText, { fontSize: 13 }]}>+ Add Task</Text>
            </TouchableOpacity>
          </View>

          {selectedTasks.length > 0 ? (
            <View style={{ marginTop: 12 }}>
              {selectedTasks.map((task) => (
                <TouchableOpacity
                  key={task._id}
                  style={{
                    padding: 12,
                    backgroundColor: "#f8fffe",
                    borderRadius: 8,
                    marginBottom: 8,
                  }}
                  onPress={() => updateTaskDate(task._id)}
                >
                  <Text style={{ fontWeight: "600" }}>{task.title}</Text>
                  <Text style={styles.small}>
                    {new Date(task.dueAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  <Text style={[styles.small, { color: tokens.accent1 }]}>Tap to change date</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={[styles.small, { marginTop: 12 }]}>No tasks for this date</Text>
          )}
        </View>
      )}

      {/* Add Task Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              width: "90%",
              maxWidth: 400,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 4 }}>Add Task</Text>
            <Text style={styles.small}>
              For {new Date(addingForDate).toLocaleDateString()}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Task name"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              autoFocus
            />

            <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
              <TouchableOpacity style={[styles.btn, { flex: 1 }]} onPress={createTask}>
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btnSecondary, { flex: 1 }]}
                onPress={() => setShowAddModal(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}