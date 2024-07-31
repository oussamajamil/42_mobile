// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as AuthConfig from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

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
export const notesCollection: any = collection(FireBaseDb, "notes");

export const WriteDateToFirseBae = async (cl: any, data: any) => {
  try {
    const res = await addDoc(collection(FireBaseDb, cl), data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const DeleteData = async (cl: any, id: string) => {
  try {
    const res = await deleteDoc(doc(FireBaseDb, cl, id));
    return res;
  } catch (error) {
    throw error;
  }
};

export const UpdateData = async (cl: any, id: string, data: any) => {
  try {
    const res = await setDoc(doc(FireBaseDb, cl, id), data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getWithUserIdOrType = async (
  cl: any,
  userId: string,
  type?: string,
  take: number = 1000
) => {
  try {
    const dataRef = collection(FireBaseDb, cl);
    let q: any;

    q = query(dataRef, where("uid", "==", userId));
    if (type && type !== "all") {
      q = query(q, where("type", "==", type));
    }
    q = query(q, limit(take));
    const snap = await getDocs(q);
    const res = snap.docs.map((doc: any) => {
      return { ...doc.data(), id: doc.id };
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const findOneWithId = async (cl: string, id: string) => {
  try {
    const noteRef = doc(FireBaseDb, cl, id);
    const noteDoc = await getDoc(noteRef);

    if (noteDoc.exists()) {
      return { id: noteDoc.id, ...noteDoc.data() };
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error finding note:", e);
    throw e; // Rethrow the error to handle it in the caller
  }
};
