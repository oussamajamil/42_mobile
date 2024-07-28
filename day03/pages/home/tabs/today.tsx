import { View, Text, FlatList, Image, ScrollViewBase } from "react-native";
import React, { useEffect, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWeatherDay } from "../../../api";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../../store";
import { AntDesign } from "@expo/vector-icons";
import { useOrientation } from "../../../hooks/useOrientation";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { format } from "date-fns";
import {
  getWeatherColor,
  getWeatherGradient,
  getWeatherImage,
} from "../../../utils/function";
import { ImageWeather } from "./currently";
import { colors } from "../../../utils/constants";
import { ScrollView } from "react-native-gesture-handler";

const Today = () => {
  const { location, loadingGlobal, position } = useStore();
  const [image, setImage] = React.useState(null);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weatherDay", location?.latitude, location?.longitude],
    queryFn: async () =>
      await getWeatherDay(location?.latitude, location?.longitude),
  });

  const orientation = useOrientation();

  useEffect(() => {
    setImage(
      ImageWeather[getWeatherImage(data?.current_weather?.weathercode)] as any
    );
  }, [data?.current_weather?.weathercode]);
  const tmpData = useMemo<{
    data: {
      x: Date;
      y: number;
    }[];
  }>(() => {
    if (!data) return { data: [] };
    return {
      data: Array.from({ length: 24 }, (_, index) => {
        return {
          x: new Date(data?.hourly?.time[index] || new Date()),
          y: data?.hourly?.temperature_2m[index] || 0,
        };
      }),
    };
  }, [data]);

  const todayData = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => {
      return {
        hour: data?.hourly.time[index],
        tmp: data?.hourly.temperature_2m[index],
        weather: data?.hourly.weathercode[index],
        windspeed: data?.hourly.windspeed_10m[index],
      };
    });
  }, [data]);

  if (isLoading || loadingGlobal)
    return (
      <View className="flex-1 flex items-center justify-center">
        <AntDesign name="loading1" size={24} color="black" />
      </View>
    );

  if (isError || !location || !data) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <Text
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
    <ScrollView>
      <View
        className="w-full h-full flex-1 justify-evenly flex-wrap gap-4 py-8 px-2"
        style={{
          flexDirection: orientation === "landscape" ? "row" : "column",
          overflow: "scroll",
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
              labels: Array.from({ length: 6 }, (_, index) => {
                return format(new Date(data?.hourly.time[index * 4]), "HH:mm");
              }),
              datasets: [
                {
                  data: tmpData.data.map((item) => item.y),
                },
              ],
            }}
            width={Dimensions.get("window").width - 20}
            height={260}
            yAxisSuffix="C"
            yAxisInterval={4}
            chartConfig={{
              ...getWeatherGradient(data?.current_weather?.weathercode),
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
              maxHeight: "100%",
            }}
          />
        </View>
        <View>
          <FlatList
            style={{ height: "auto", flex: 0 }}
            data={todayData}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
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
                  <Text className="text-xl">
                    {item?.hour && format(new Date(item?.hour), "HH:mm")}
                  </Text>
                  <Image
                    source={ImageWeather[getWeatherImage(item.weather)] as any}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text className="text-xl">{item?.tmp}°C</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={ImageWeather["windy.png"] as any}
                      style={{ width: 30, height: 30 }}
                    />
                    <Text>{item.windspeed}km/h</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Today;
