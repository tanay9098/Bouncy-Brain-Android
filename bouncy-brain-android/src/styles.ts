// src/styles.ts
import { StyleSheet } from "react-native";

export const tokens = {
  bg: "#f7fafc",
  card: "#ffffff",
  muted: "#6b7280",
  accent1: "#bfe9d7",
  accent2: "#cde7ff",
  accent3: "#ffdfe6",
  text: "#0f172a",
  radius: 12
};

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1fbff", padding: 16 },
  card: {
    backgroundColor: tokens.card,
    borderRadius: tokens.radius,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#101828",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  small: { fontSize: 13, color: tokens.muted },
  btn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, backgroundColor: "#8fe6c9", alignItems: "center" },
  btnText: { fontWeight: "700", color: tokens.text },
  btnSecondary: { padding: 8, borderRadius: 10, borderWidth: 1, borderColor: "#e6eef5", alignItems: "center" },
  input: { borderWidth: 1, borderColor: "#e6eef5", borderRadius: 8, padding: 10, marginTop: 8 },
  timerLarge: { fontFamily: "monospace", fontSize: 48, textAlign: "center", paddingVertical: 12 },
});
