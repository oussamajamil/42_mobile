import { View, Text } from "react-native";
import React from "react";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getWeatherCurrent } from "@/api";

const Currently = () => {
  const { selectPosition } = useStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "weatherDay",
      selectPosition?.latitude,
      selectPosition?.longitude,
    ],
    queryFn: async () => {
      if (!selectPosition?.latitude || !selectPosition?.longitude) return null;
      return await getWeatherCurrent(
        selectPosition?.latitude,
        selectPosition?.longitude
      );
    },
  });

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="h-1/2 bg-black/30 w-full rounded-xl p-2">
        {isLoading && !isError ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error...</Text>
        ) : selectPosition ? (
          <View className=" p-4 flex gap-2">
            <Text className="text-4xl font-bold ">
              {data?.current_weather?.temperature}°C
            </Text>
            <Text className="text-xl font-medium">
              {data?.current_weather?.windspeed}km/h
            </Text>
          </View>
        ) : (
          <Text>No location found</Text>
        )}
      </View>
    </View>
  );
};

export default Currently;
