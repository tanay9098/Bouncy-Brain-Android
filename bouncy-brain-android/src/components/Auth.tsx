// src/components/Auth.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { api } from "../api";
import { useUser } from "../contexts/UserContext";
import { router } from "expo-router";

import { styles } from "../styles";

export default function Auth() {
  const { setUser, setToken } = useUser();
  const nav = router;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function submit() {
    try {
      const path = isLogin ? "/auth/login" : "/auth/signup";
      const body = isLogin ? { email, password } : { email, password, name };
      const res = await api.post(path, body);
      setUser(res.user);
      await setToken(res.token);
      // navigate home
      // @ts-ignore
      nav.navigate("Home");
    } catch (err: any) {
      Alert.alert("Error", err?.message || "Error");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
      <View style={styles.card}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>{isLogin ? "Login" : "Create account"}</Text>
        {!isLogin && (
          <TextInput style={styles.input} placeholder="Your name" value={name} onChangeText={setName} />
        )}
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity onPress={submit} style={[styles.btn, { marginTop: 12 }]}>
          <Text style={styles.btnText}>{isLogin ? "Login" : "Sign up"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(s => !s)} style={{ marginTop: 12, alignItems: "center" }}>
          <Text style={styles.small}>{isLogin ? "Don't have an account? Create" : "Already have an account? Login"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
