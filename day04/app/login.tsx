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
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { router } from "expo-router";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseAuth } from "@/utils/firebase";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const singIn = async () => {
    try {
      setLoading(true);
      if (!data.email || !data.password) {
        alert("Please fill all fields");
      } else {
        await signInWithEmailAndPassword(
          FirebaseAuth,
          data.email,
          data.password
        );
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred");
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
        className="flex-1 justify-center "
        style={{
          marginHorizontal: wp(10),
          gap: wp(10),
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
              onChangeText={(val) => {
                setData({
                  ...data,
                  email: val,
                });
              }}
              value={data.email}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
            />
          </View>
          <View className="flex-col">
            <Text>Password</Text>
            <TextInput
              onChangeText={(val) => {
                setData({
                  ...data,
                  password: val,
                });
              }}
              value={data.password}
              secureTextEntry
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "black",
              }}
            />
          </View>
        </View>
        <View>
          <Button text="Sign in" onPress={singIn} isLoading={loading} />
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

export default Login;
