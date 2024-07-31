import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Slot, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useStore } from "@/store";
import { findOneWithId, FirebaseAuth } from "@/utils/firebase";
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
    const unsub = onAuthStateChanged(FirebaseAuth, async (user) => {
      setLoading(false);
      if (user) {
        const resUser: any = await findOneWithId("users", user.uid);
        setUser({
          email: user?.email || resUser?.email,
          uid: user?.uid,
          displayName:
            user?.displayName || (user?.email || resUser?.email).split("@")[0],
          photoURL: user?.photoURL || "",
        });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  return <Slot />;
};

export default LayoutApp;
