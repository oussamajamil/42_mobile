import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useStore } from "@/store";
import { wp } from "@/helpers/common";
import { signOut } from "@firebase/auth";
import { FirebaseAuth } from "@/utils/firebase";
const HomeScreen = () => {
  const { user } = useStore();
  return (
    <ScreenWrapper>
      <Text>{JSON.stringify(user)}</Text>
      <TouchableOpacity
        className="bg-red-500"
        style={{
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: wp(50),
        }}
        onPress={() => {
          signOut(FirebaseAuth);
        }}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default HomeScreen;
