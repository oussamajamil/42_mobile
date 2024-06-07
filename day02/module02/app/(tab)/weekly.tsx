import { View, Text, ScrollView } from "react-native";
import { useStore } from "../../store";
import LocationComponent from "../../components/location";
import { useQuery } from "@tanstack/react-query";
import { getWeatherWeek } from "../../api";
import { getWeatherDescription } from "../../utils/function";
import { LoaderCircle } from "lucide-react-native";

const Weekly = () => {
  const { location, position, loadingGlobal } = useStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weatherWeekly", location?.latitude, location?.longitude],
    queryFn: async () =>
      await getWeatherWeek(location?.latitude, location?.longitude),
  });

  if (loadingGlobal || isLoading)
    return (
      <View className="flex-1 p-2 items-center justify-center">
        <LoaderCircle className="text-[#FFA001] animate-spin" size={60} />
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
                new Array(7).fill(0).map((_, index) => (
                  <View
                    key={index}
                    className="flex flex-row justify-between items-center p-2 border border-gray-200 rounded-md divide-x-2 divide-gray-300"
                  >
                    <Text className="flex-1 ">{data.daily.time[index]}</Text>
                    <Text className="flex-1 text-center">
                      {data.daily.temperature_2m_max[index]}°C
                    </Text>
                    <Text className="flex-1 w-6 text-center">
                      {data.daily.temperature_2m_min[index]}°C
                    </Text>
                    <Text className="flex-1 w-6 text-center">
                      {getWeatherDescription(data?.daily?.weathercode[index])}
                    </Text>
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

export default Weekly;
