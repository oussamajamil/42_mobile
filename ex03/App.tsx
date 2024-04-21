import { StatusBar } from "expo-status-bar";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  ClavieCalculPortrait,
  ClavieCalculLandscape,
} from "./src/constant/calcul";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { DeleteIcon } from "lucide-react-native";
import { calculate } from "./src/utils/function";
import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  const width = Dimensions.get("window").width;
  const [equation, setEquation] = useState("0");
  const [result, setResult] = useState<number | string>(0);
  const landscape = useDeviceOrientation();

  return (
    <SafeAreaView
      className="flex  justify-center"
      style={{
        flex: 1,
        backgroundColor: "black",
        opacity: 0.8,
      }}
    >
      <View className="text-left  w-full p-4 bg-gray-400/20">
        <Text className="text-white text-xl shadow z-10 font-bold">
          Calculate
        </Text>
      </View>
      <View
        className={`flex flex-1  bg-black/20 px-4 justify-end rounded-sn min-h-[10rem] `}
      >
        <Text
          className={`text-white  text-2xl font-bold  text-right px-[${
            landscape !== "portrait" ? 10 : 0
          }] `}
        >
          {equation}
        </Text>
        <Text className="text-white  text-xl font-bold text-right ">
          {result === "hidden" ? "" : "=" + result + ""}
        </Text>
      </View>
      <View
        className="w-full flex-row flex-wrap gap-2 justify-center    items-center flex mt-6"
        style={{
          gap: landscape === "portrait" ? 5 : 1,
        }}
      >
        {(landscape === "portrait"
          ? ClavieCalculPortrait
          : ClavieCalculLandscape
        ).map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                width:
                  landscape !== "portrait" ? width / 5 - 10 : width / 4 - 20,
                height: landscape !== "portrait" ? 30 : width / 4 - 20,
                backgroundColor: item.background || "gray",
              }}
              key={index}
              className="items-center justify-center  rounded-full opacity-90"
              onPress={() => {
                calculate(
                  item.type,
                  item.value,
                  equation,
                  setEquation,
                  setResult
                );
              }}
            >
              <Text
                style={{
                  color: item.color || "white",
                  fontSize: landscape !== "portrait" ? 20 : 25,
                }}
              >
                {item.value !== "C" ? (
                  item.value
                ) : (
                  <DeleteIcon
                    size={landscape === "portrait" ? 25 : 15}
                    color="orange"
                  />
                )}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
