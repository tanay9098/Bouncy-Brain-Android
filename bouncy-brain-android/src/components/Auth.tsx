// src/components/Auth.tsx
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { api } from "../api";
import { useUser } from "../contexts/UserContext";

export default function Auth() {
  const { setUser, setToken } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function submit() {
    try {
      const path = isLogin ? "/auth/login" : "/auth/signup";
      const body = isLogin ? { email, password } : { name, email, password };
      const res = await api.post(path, body);
      await setToken(res.token);
      await setUser(res.user);
    } catch (e: any) {
      Alert.alert("Auth failed", e.message);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>
        {isLogin ? "Login" : "Create Account"}
      </Text>

      {!isLogin && (
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
      )}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={submit}>
        <Text>{isLogin ? "Login" : "Sign up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(v => !v)}>
        <Text style={{ marginTop: 8 }}>
          {isLogin ? "Create account" : "Already have an account?"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

