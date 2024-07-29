import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Slot, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useStore } from "@/store";
import { FirebaseAuth } from "@/utils/firebase";
import { SWRConfig } from "swr";
import { onAuthStateChanged } from "firebase/auth";

const LayoutApp = () => {
  const segments = useSegments();
  const { isAuthenticated, setIsAuthenticated, setUser, setLoading } =
    useStore();
  useEffect(() => {
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("/(app)/home");
    } else if (!isAuthenticated) {
      console.log("Redirect to /signIn");
      router.replace("welcome");
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const unsub = onAuthStateChanged(FirebaseAuth, (user) => {
      setLoading(false);
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName || (user?.email || "").split("@")[0],
          photoURL: user.photoURL,
        });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        revalidateOnFocus: false,
      }}
    >
      <Slot />
    </SWRConfig>
  );
};

export default LayoutApp;
