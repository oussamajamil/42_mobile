import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router, Slot, Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useStore } from "@/store";
import { FirebaseAuth } from "@/utils/firebase";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
// WebBrowser.maybeCompleteAuthSession();

const LayoutApp = () => {
  const segments = useSegments();
  const { isAuthenticated, setIsAuthenticated, setUser } = useStore();
  useEffect(() => {
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (!isAuthenticated) {
      console.log("Redirect to /signIn");
      router.replace("welcome");
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const unsub = onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  return (
    <>
      <Slot />
    </>
  );
};

export default LayoutApp;
