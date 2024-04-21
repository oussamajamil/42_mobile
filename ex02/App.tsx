import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ClavieCalcul } from "./src/constant/calcul";

export default function App() {
  const width = Dimensions.get("window").width;
  const [equation, setEquation] = useState("0");
  return (
    <SafeAreaView
      className="flex  justify-center gap-4"
      style={{
        flex: 1,
        backgroundColor: "black",
        opacity: 0.8,
      }}
    >
      <View className="border text-left  w-full p-4 bg-gray-400/20">
        <Text className="text-white text-xl shadow z-10 font-bold">
          Calculate
        </Text>
      </View>
      <View className="flex flex-1   w-[90%] justify-end">
        <Text className="text-white  text-3xl font-bold  text-right ">
          {equation}
        </Text>
        <Text className="text-white  text-2xl font-bold text-right ">
          hello
        </Text>
      </View>
      <View className="w-full flex-row flex-wrap gap-4  items-center flex  ">
        {ClavieCalcul.map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                width: width / 4 - 20,
                height: width / 4 - 20,
                backgroundColor: item.background || "gray",
              }}
              key={index}
              className="bg-gray-800/20 py-4 items-center justify-center rounded-full"
              onPress={() => {
                console.log(item);
                if (item.type === "number" || item.type === "operator") {
                  console.log("number");
                  setEquation((prev) => prev + item.value);
                }
              }}
            >
              <Text
                className="text-white text-2xl font-bold"
                style={{
                  color: item.color || "white",
                }}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* hello */}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
