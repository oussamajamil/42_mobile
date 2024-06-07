import { View, Text, TouchableOpacity } from "react-native";
import { useStore } from "../../store";
import LocationComponent from "../../components/location";
import { useQuery } from "@tanstack/react-query";
import { getWeatherCurrent } from "../../api";
import { getWeatherDescription } from "../../utils/function";
import { LoaderCircle } from "lucide-react-native";

const Currently = () => {
  const { location, position, loadingGlobal } = useStore();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", location?.latitude, location?.longitude],
    queryFn: async () =>
      await getWeatherCurrent(location?.latitude, location?.longitude),
  });

  if (loadingGlobal)
    return (
      <View className="flex-1 p-2 items-center justify-center">
        <LoaderCircle className="text-[#FFA001] animate-spin" size={60} />
      </View>
    );
  return (
    <View className="flex-1 p-2 items-center">
      {location && position ? (
        <>
          <LocationComponent />
          {isError && (
            <Text
              style={{
                color: "red",
                fontSize: 14,
                paddingHorizontal: 16,
              }}
            >
              {error?.message || "An error occurred"}
            </Text>
          )}
          {data?.current_weather && !isLoading && (
            <View className="mt-5">
              <Text className="text-2xl">
                {data?.current_weather?.temperature}°C
              </Text>
              <Text className="text-2xl">
                {data?.current_weather?.windspeed}km/h
              </Text>
              <Text className="text-2xl">
                {getWeatherDescription(data?.current_weather?.weathercode)}
              </Text>
            </View>
          )}
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

export default Currently;
