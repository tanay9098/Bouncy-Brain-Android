// src/contexts/UserContext.js
// src/contexts/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken as setApiToken } from "../api";

type User = { _id?: string; name?: string; email?: string } | null;

type UserContextValue = {
  user: User;
  setUser: (u: User) => Promise<void>;
  token: string | null;
  setToken: (t: string | null) => Promise<void>;
  loading: boolean;
};

const ctx = createContext<UserContextValue | undefined>(undefined);
export const useUser = () => {
  const c = useContext(ctx);
  if (!c) throw new Error("useUser must be used inside UserProvider");
  return c;
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");
        if (storedToken) {
          setTokenState(storedToken);
          setApiToken(storedToken);
        }
        if (storedUser) setUserState(JSON.parse(storedUser));
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function saveToken(t: string | null) {
    setTokenState(t);
    setApiToken(t);
    try {
      if (t) await AsyncStorage.setItem("token", t);
      else await AsyncStorage.removeItem("token");
    } catch {}
  }

  async function saveUser(u: User) {
    setUserState(u);
    try {
      if (u) await AsyncStorage.setItem("user", JSON.stringify(u));
      else await AsyncStorage.removeItem("user");
    } catch {}
  }

  return (
    <ctx.Provider value={{ user, setUser: saveUser, token, setToken: saveToken, loading }}>
      {children}
    </ctx.Provider>
  );
}
