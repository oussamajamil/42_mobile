// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as AuthConfig from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyADrzJ9D6nz_UiznxWV7w2QNSCgQDtBiV4",
  authDomain: "day04-eddaa.firebaseapp.com",
  projectId: "day04-eddaa",
  storageBucket: "day04-eddaa.appspot.com",
  messagingSenderId: "884622309731",
  appId: "1:884622309731:web:7cc4132b26781f7f4ffb56",
};

// Initialize Firebase
export const AppFireBase = initializeApp(firebaseConfig);
export const FirebaseAuth = AuthConfig.initializeAuth(AppFireBase, {
  persistence: (AuthConfig as any).getReactNativePersistence(AsyncStorage),
});
export const FireBaseDb = getFirestore(AppFireBase);
export const userCollection = collection(FireBaseDb, "users");
