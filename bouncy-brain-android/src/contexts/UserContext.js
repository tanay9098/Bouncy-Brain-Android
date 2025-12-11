// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken as setApiToken } from "../api";

const ctx = createContext();
export const useUser = () => useContext(ctx);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load(){
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedToken) {
          setToken(storedToken);
          setApiToken(storedToken);
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch(e){ /* ignore */ }
      setLoading(false);
    }
    load();
  }, []);

  async function saveToken(t) {
    setToken(t);
    setApiToken(t);
    if(t) await AsyncStorage.setItem("token", t);
    else await AsyncStorage.removeItem("token");
  }

  async function saveUser(u) {
    setUser(u);
    if(u) await AsyncStorage.setItem("user", JSON.stringify(u));
    else await AsyncStorage.removeItem("user");
  }

  return (
    <ctx.Provider value={{ user, setUser: saveUser, token, setToken: saveToken, loading }}>
      {children}
    </ctx.Provider>
  );
}
