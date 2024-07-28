import { View, Text, FlatList, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWeatherDay, getWeatherWeek } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../../store";
import { AntDesign } from "@expo/vector-icons";
import { useOrientation } from "../../../hooks/useOrientation";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { format } from "date-fns";
import { getWeatherColor, getWeatherImage } from "../../../utils/function";
import { ImageWeather } from "./currently";
import { colors } from "../../../utils/constants";

const Weekly = () => {
  const { location, loadingGlobal, position } = useStore();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weatherWeekly", location?.latitude, location?.longitude],
    queryFn: async () =>
      await getWeatherWeek(location?.latitude, location?.longitude),
  });
  const orientation = useOrientation();
  const weeklyData = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      return {
        hour: data?.daily?.time[index],
        max: data?.daily.temperature_2m_max[index],
        min: data?.daily.temperature_2m_min[index],
        weather: data?.daily?.weathercode[index],
      };
    });
  }, [data]);

  const temperature = useMemo<{
    data: {
      min: number;
      max: number;
    }[];
  }>(() => {
    return {
      data: Array.from({ length: 7 }, (_, index) => {
        return {
          min: data?.daily.temperature_2m_min[index] || 0,
          max: data?.daily.temperature_2m_max[index] || 0,
        };
      }),
    };
  }, [data]);

  if (isLoading || loadingGlobal)
    return (
      <View className="flex-1 flex items-center justify-center">
        <AntDesign
          name="loading1"
          size={24}
          color="black"
          className="animate-spin duration-75 ease-linear"
          style={{
            color: colors.primary,
          }}
        />
      </View>
    );

  if (isError || !location || !data) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <Text
          className="text-xl font-bold"
          style={{
            color: colors.danger,
          }}
        >
          {error?.message || "An error occurred while fetching data"}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        gap: 4,
      }}
    >
      <View
        className="w-full h-full flex-1 justify-evenly gap-5 px-2 py-5"
        style={{
          flexDirection: orientation === "landscape" ? "row" : "column",
        }}
      >
        <View className="flex">
          <Text
            className="text-xl text-center"
            style={{
              color: getWeatherColor(data?.current_weather?.weathercode),
            }}
          >
            {position?.city}
          </Text>
          <View className="flex gap-2">
            <Text className="text-sm text-center">{position?.region}/</Text>
          </View>
          <LineChart
            data={{
              labels: weeklyData.map((item) =>
                format(new Date(item?.hour), "d/M ")
              ),
              datasets: [
                {
                  data: temperature.data.map((item) => item.min),
                  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue color for min temperatures
                },
                {
                  data: temperature.data.map((item) => item.max),
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Red color for max temperatures
                },
              ],
            }}
            width={Dimensions.get("window").width - 20}
            height={260}
            yAxisSuffix="C"
            yAxisInterval={4}
            chartConfig={{
              color: () => "white",
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 0,
              },
              propsForDots: {
                r: "3",
                strokeWidth: "2",
              },
            }}
            bezier
            style={{
              borderRadius: 8,
              marginHorizontal: "auto",
              marginVertical: "auto",
            }}
          />
        </View>
        <View>
          <FlatList
            style={{ height: "auto", flex: 0 }}
            data={weeklyData}
            horizontal={true}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  className="bg-white/20 rounded-xl shadow-xl mx-2"
                  style={{
                    display: "flex",
                    gap: 4,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <Text className="text-lg">
                    {item.hour && format(new Date(item?.hour), "EEE M/d")}
                  </Text>
                  <Image
                    source={ImageWeather[getWeatherImage(item?.weather)]}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text className="text-blue-700 text-md">{item?.min}°C</Text>
                  <Text className="text-red-500 text-md">{item?.max}°C</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Weekly;
