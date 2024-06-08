import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  Keyboard,
  FlatList,
  ImageBackground,
} from "react-native";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import TabsIcon from "../../components/TabsIcon";
import { NavigationContainer } from "@react-navigation/native";
import {
  Calendar,
  CalendarDays,
  LoaderCircle,
  MapPin,
  MapPinned,
  Search,
  Settings,
} from "lucide-react-native";
import { useStore } from "../../store";
import * as Location from "expo-location";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getLocations } from "../../api";

const _layout = () => {
  const {
    setLocation,
    setError,
    location,
    setPosition,
    setLoadingGlobal,
    loadingGlobal,
  } = useStore();
  const [stateSearch, setStateSearch] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const {
    data: cities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cities", stateSearch],
    queryFn: async () => {
      try {
        if (stateSearch.length <= 2) {
          return [];
        }
        const data = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${stateSearch}`
        );
        if (!data.data.results) throw new Error("no results found");
        return data?.data?.results || [];
      } catch (e) {
        throw new Error("An error occurred");
      }
    },
  });

  useQuery({
    queryKey: ["position", location?.latitude, location?.longitude],
    queryFn: async () => {
      try {
        setLoadingGlobal(true);
        if (!location) {
          setLoadingGlobal(false);
          return null;
        }
        const data = await getLocations(location.latitude, location.longitude);

        if (!data) {
          setLoadingGlobal(false);
          throw new Error("An error occurred");
        } else {
          setPosition(data || null);
          setLoadingGlobal(false);
          return data || null;
        }
      } catch (e) {
        setLoadingGlobal(false);
        throw new Error("An error occurred");
      }
    },
  });

  // FOR DELETE ERROR WHEN LOCATION IS SET
  useEffect(() => {
    if (location) {
      setError(null);
    }
  }, [location]);

  const height = Dimensions.get("window").height;
  return (
    <View className="flex-1 bg-red-500">
      <ImageBackground
        source={{ uri: "https://example.com/your-background-image.jpg" }}
        className="flex-1"
        resizeMode="cover"
      >
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#FFA001",
            tabBarInactiveTintColor: "white",
            tabBarStyle: {
              backgroundColor: "transparent",
              borderTopWidth: 1,
              borderTopColor: "transparent",
              height: 60,
            },
            header: () => (
              <SafeAreaView>
                <View className="flex-row justify-between items-center py-2 px-2 gap-1  relative  bg-transparent">
                  <View className="flex-1 items-center flex-row gap-2">
                    <Search className="text-gray-500" size={20} />
                    <TextInput
                      className="p-1 flex-1"
                      id="search"
                      onFocus={() => setVisible(true)}
                      value={stateSearch}
                      onChangeText={(text: string) => setStateSearch(text)}
                      placeholder="Search...."
                    />
                  </View>
                  <TouchableOpacity
                    className="bg-[#FFA001] p-1 rounded-full"
                    onPress={async () => {
                      try {
                        let { status } =
                          await Location.requestForegroundPermissionsAsync();
                        if (status !== "granted") {
                          setLocation(null);
                          setError("Permission to access location was denied");
                          return;
                        }
                        const location = await Location.getCurrentPositionAsync(
                          {}
                        );
                        setLocation({
                          latitude: location.coords.latitude,
                          longitude: location.coords.longitude,
                        });
                      } catch (error) {
                        setError(
                          "Geolocation is not available, please it in your App settings"
                        );
                      }
                    }}
                  >
                    <MapPin color="white" />
                  </TouchableOpacity>
                  <View
                    className="absolute left-0 right-0 top-[50] bg-white "
                    style={{
                      height: height - 50,
                      display:
                        visible && stateSearch.length > 2 ? "flex" : "none",
                    }}
                  >
                    {cities?.length === 0 ? (
                      <View className="flex-1 mt-5 items-center">
                        <Text className="text-red-500 text-2xl">
                          No results
                        </Text>
                      </View>
                    ) : isLoading || loadingGlobal ? (
                      <View className="flex-1 mt-5 items-center justify-center">
                        <LoaderCircle />
                      </View>
                    ) : isError ? (
                      <View className="flex-1 mt-5 items-center ">
                        <Text className="text-red-500 text-2xl">
                          An error occurred
                        </Text>
                      </View>
                    ) : (
                      <FlatList
                        data={cities.slice(0, 5)}
                        renderItem={({
                          item,
                        }: {
                          item: {
                            id: string;
                            name: string;
                            latitude: number;
                            longitude: number;
                            country: string;
                            admin1: string;
                          };
                        }) => (
                          <TouchableOpacity
                            onPress={() => {
                              setLocation({
                                latitude: item?.latitude,
                                longitude: item?.longitude,
                              });
                              setStateSearch(item?.name);
                              Keyboard.dismiss();
                              setVisible(false);
                            }}
                            style={{
                              padding: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: "#f0f0f0",
                            }}
                          >
                            <View className="flex flex-row gap-2 items-center">
                              <MapPinned className="text-gray-500" />

                              <Text className="font-bold">{item?.name}</Text>
                              <Text className="text-gray-500 text-sm">
                                {item?.admin1}, {item?.country}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item?.id}
                      />
                    )}
                  </View>
                </View>
              </SafeAreaView>
            ),
          }}
        >
          <Tabs.Screen
            clasName="bg-red-500"
            name="currently"
            options={{
              tabBarIcon: ({
                color,
                focused,
              }: {
                color: string;
                focused: boolean;
              }) => (
                <TabsIcon
                  name="currently"
                  icon={<Calendar color={color} />}
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="today"
            options={{
              tabBarIcon: ({
                color,
                focused,
              }: {
                color: string;
                focused: boolean;
              }) => (
                <TabsIcon
                  name="today"
                  icon={<Settings color={color} />}
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="weekly"
            options={{
              tabBarIcon: ({
                color,
                focused,
              }: {
                color: string;
                focused: boolean;
              }) => (
                <TabsIcon
                  name="weekly"
                  icon={<CalendarDays color={color} />}
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
};

export default _layout;
