import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

export default function App() {
  const [isHello, setIsHello] = useState(false);
  return (
    <SafeAreaView
      className="flex items-center justify-center gap-4"
      style={{
        flex: 1,
        backgroundColor: "black",
        opacity: 0.8,
      }}
    >
      <Text className="text-2xl font-bold text-white">
        {isHello ? "Hello, World!" : "Goodbye, World!"}
      </Text>
      <TouchableOpacity
        className="border p-2 bg-red-500 rounded-lg"
        style={{
          borderColor: "red",
        }}
        onPress={() => {
          setIsHello(!isHello);
        }}
      >
        <Text className="text-white text-xl ">click me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
