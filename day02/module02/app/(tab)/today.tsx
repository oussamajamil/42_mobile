import { View, Text, ScrollView } from "react-native";
import { useStore } from "../../store";
import LocationComponent from "../../components/location";
import { useQuery } from "@tanstack/react-query";
import { getWeatherDay } from "../../api";
import { getWeatherDescription } from "../../utils/function";

const Today = () => {
  const { location, position, loadingGlobal } = useStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weatherDay", location?.latitude, location?.longitude],
    queryFn: async () =>
      await getWeatherDay(location?.latitude, location?.longitude),
  });

  if (loadingGlobal || isLoading)
    return (
      <View className="flex-1 p-2 items-center">
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View className="flex-1 p-2 ">
      {location && position ? (
        <>
          <LocationComponent />
          <ScrollView className="mt-2">
            {isError && (
              <Text
                style={{
                  color: "red",
                  fontSize: 14,
                  paddingHorizontal: 16,
                }}
              >
                {"An error occurred"}
              </Text>
            )}
            <View className="w-full h-full   flex flex-col gap-1 ">
              {data &&
                new Array(24).fill(0).map((_, i) => (
                  <View
                    key={i}
                    className="flex-row   bg-gray-500/20 w-full justify-between p-4 rounded-md "
                  >
                    <Text>{data?.hourly?.time[i]}</Text>
                    <Text>{data?.hourly?.temperature_2m[i]}°C</Text>
                    <Text>
                      {getWeatherDescription(data?.hourly?.weathercode[i])}
                    </Text>
                    <Text>{data?.hourly?.windspeed_10m[i]}km/s</Text>
                  </View>
                ))}
            </View>
          </ScrollView>
        </>
      ) : (
        <Text
          style={{
            color: "red",
            fontSize: 14,
            paddingHorizontal: 16,
          }}
        >
          Geolocation is not available, please it in your App settings
        </Text>
      )}
    </View>
  );
};

export default Today;
