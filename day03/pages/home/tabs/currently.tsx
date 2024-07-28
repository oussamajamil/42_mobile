import { View, Text, Image } from "react-native";
import React, { Fragment, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWeatherCurrent } from "../../../api";
import { useStore } from "../../../store";
import { useQuery } from "@tanstack/react-query";
import { AntDesign } from "@expo/vector-icons";
import {
  getWeatherColor,
  getWeatherDescription,
  getWeatherImage,
} from "../../../utils/function";
import { useOrientation } from "../../../hooks/useOrientation";

export const ImageWeather = {
  "sunny.png": require("../../../assets/sunny.png"),
  "cloudy.png": require("../../../assets/cloudy.png"),
  "rain-light.png": require("../../../assets/rain-light.png"),
  "snowy.png": require("../../../assets/snowy.png"),
  "thunder.png": require("../../../assets/thunder.png"),
  "windy.png": require("../../../assets/windy.png"),
};
const Currently = () => {
  const { location, loadingGlobal, position, isDark } = useStore();
  const [image, setImage] = React.useState(null);
  const orientation = useOrientation();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", location?.latitude, location?.longitude],
    queryFn: async () =>
      await getWeatherCurrent(location?.latitude, location?.longitude),
  });
  useEffect(() => {
    setImage(
      ImageWeather[getWeatherImage(data?.current_weather?.weathercode)] as any
    );
  }, [data?.current_weather?.weathercode]);

  if (isLoading || loadingGlobal)
    return (
      <View className="flex-1 flex items-center justify-center">
        <AntDesign name="loading1" size={24} color="black" />
      </View>
    );

  if (isError || !location || !data) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <Text className="text-red-500">
          {error?.message || "An error occurred while fetching data"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1  flex items-center justify-center px-[40px]">
      <View className="w-full min-h-[50%] h-fit shadow-xl rounded-xl bg-white/20 flex relative items-center justify-center">
        <Image
          className="absolute -top-[60] -left-12"
          source={image as any}
          style={{
            width: orientation === "landscape" ? 120 : 120,
            height: orientation === "landscape" ? 120 : 120,
            transform: [{ rotate: "-40deg" }],
          }}
        />
        {data?.current_weather && !isLoading && (
          <View
            className="flex gap-1"
            style={{
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text
              className={"font-bold"}
              style={{
                color: getWeatherColor(data?.current_weather?.weathercode),
                fontStyle: "italic",
                fontSize: orientation === "landscape" ? 35 : 60,
              }}
            >
              {data?.current_weather?.temperature}°C
            </Text>
            <Text
              style={{
                color: isDark ? "#ffffff" : "#000000",
                fontSize: orientation === "landscape" ? 25 : 30,
              }}
            >
              {data?.current_weather?.windspeed}km/h
            </Text>
            <Text
              className="text-4xl "
              style={{
                color: isDark ? "#ffffff" : "#000000",
                fontSize: orientation === "landscape" ? 25 : 30,
              }}
            >
              {getWeatherDescription(data?.current_weather?.weathercode)}
            </Text>
          </View>
        )}
        <View className="flex  flex-row px-6  flex-wrap pt-5">
          <Text
            className="text-lg"
            style={{
              color: isDark ? "#ffffff" : "#000000",
              fontSize: orientation === "landscape" ? 10 : 30,
            }}
          >
            {position?.country}/
          </Text>
          <Text
            className="text-lg"
            style={{
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            {position?.city}/
          </Text>
          <Text
            className="text-lg"
            style={{
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            {position?.region}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Currently;
