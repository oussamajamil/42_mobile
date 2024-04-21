import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  ClavieCalculPortrait,
  ClavieCalculLandscape,
} from "./src/constant/calcul";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { DeleteIcon } from "lucide-react-native";
import { calculate } from "./src/utils/function";
export default function App() {
  const width = Dimensions.get("window").width;
  const [equation, setEquation] = useState("0");
  const [result, setResult] = useState<number | string>(0);
  const landscape = useDeviceOrientation();

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
      <View className={`flex flex-1  bg-black/20 px-4 justify-end rounded-sn`}>
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
      <View className="w-full flex-row flex-wrap gap-4   items-center flex">
        {(landscape === "portrait"
          ? ClavieCalculPortrait
          : ClavieCalculLandscape
        ).map((item, index) => {
          return (
            <TouchableOpacity
              style={{
                width:
                  landscape !== "portrait" ? width / 6 - 10 : width / 4 - 20,
                height: landscape !== "portrait" ? 40 : width / 4 - 20,
                backgroundColor: item.background || "gray",
                padding: landscape !== "portrait" ? 5 : 16,
              }}
              key={index}
              className="items-center justify-center rounded-full opacity-90"
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
                  fontSize: landscape !== "portrait" ? 25 : 35,
                }}
              >
                {item.value !== "C" ? (
                  item.value
                ) : (
                  <DeleteIcon
                    size={landscape > "portrait" ? 25 : 35}
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
