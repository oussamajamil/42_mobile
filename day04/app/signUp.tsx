import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { wp } from "@/helpers/common";
import Button from "@/components/Button";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { FirebaseAuth, FireBaseDb } from "@/utils/firebase";
import { useStore } from "@/store";
import { doc, setDoc } from "@firebase/firestore";
import { getDoc, Timestamp } from "firebase/firestore";
import Toast from "react-native-toast-message";
const SignUp = () => {
  const { setUser } = useStore();
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signUp = async () => {
    try {
      setLoading(true);
      if (!data.email || !data.password || !data.confirmPassword) {
        alert("Please fill all the fields");
      } else if (data.password !== data.confirmPassword) {
        alert("Passwords do not match");
      } else {
        const response: any = await createUserWithEmailAndPassword(
          FirebaseAuth,
          data.email,
          data.password
        );
        const userDocRef = doc(FireBaseDb, "users", response.user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            email: response?.user?.email,
            uid: response?.user?.uid,
            createdAt: Timestamp.now(),
            displayName: response?.user?.email?.split("@")?.[0],
            photoUrl: "",
          });
        }
        setUser(response.user);

        router.push("home");
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View className="absolute top-14 left-1">
        <TouchableOpacity
          onPress={() => router.push("welcome")}
          className="bg-gray-200 p-2 rounded-md"
        >
          <FontAwesome name="arrow-left" size={20} />
        </TouchableOpacity>
      </View>
      <View
        className="flex-1"
        style={{
          marginHorizontal: wp(10),
          gap: wp(10),
          marginTop: wp(35),
        }}
      >
        <View>
          <Text className="text-2xl  font-bold">Welcome Back</Text>
          <Text className="text-md  font-light">
            Sign in to continue to your account
          </Text>
        </View>
        <View
          className="flex flex-col"
          style={{
            gap: wp(5),
          }}
        >
          <View className="flex-col">
            <Text>Email</Text>
            <TextInput
              value={data.email}
              onChangeText={(text) => setData({ ...data, email: text })}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
            />
          </View>
          <View className="flex-col">
            <Text>Password</Text>
            <TextInput
              value={data.password}
              onChangeText={(text) => setData({ ...data, password: text })}
              secureTextEntry
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
            />
          </View>
          <View className="flex-col">
            <Text>Confirm Password</Text>
            <TextInput
              value={data.confirmPassword}
              onChangeText={(text) =>
                setData({ ...data, confirmPassword: text })
              }
              secureTextEntry
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
            />
          </View>
        </View>
        <View>
          <Button text="Sign in" onPress={signUp} isLoading={loading} />
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            justifyContent: "flex-end",
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;
