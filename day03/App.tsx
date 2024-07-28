import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  FlatList,
  useColorScheme,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./pages/home";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { useOrientation } from "./hooks/useOrientation";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useStore } from "./store";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import { colors, darkTheme, lightTheme } from "./utils/constants";
const Stack = createStackNavigator();

export function Header() {
  const orientation = useOrientation();

  const height = Dimensions.get("window").height;
  const { search, setSearch, setLocation, setError, isDark } = useStore();
  const [isSearching, setIsSearching] = React.useState(false);

  const {
    data: cities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cities", search],
    queryFn: async () => {
      if (search.length <= 2) {
        return [];
      }
      const data = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search`,
        {
          params: {
            count: 5,
            name: search,
          },
        }
      );
      return data?.data?.results || [];
    },
  });

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      tint="dark"
      intensity={25}
      className="relative"
      style={{
        height: orientation === "landscape" ? 64 : 90,
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          padding: 4,
        }}
      >
        <TextInput
          value={search}
          onChangeText={setSearch}
          onFocus={(e) => {
            setIsSearching(true);
          }}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: "#ffffff07",
            borderRadius: 9999,
            color: "white",
            flex: 1,
          }}
          placeholder="Search for location..."
          placeholderTextColor={"#7f7f7f"}
        />
        <TouchableOpacity
          style={{
            width: 40,
            aspectRatio: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.5}
          onPress={async () => {
            try {
              let { status } =
                await Location.requestForegroundPermissionsAsync();
              if (status !== "granted") {
                setLocation(null);
                setError("Permission to access location was denied");
                return;
              }
              const location = await Location.getCurrentPositionAsync({});
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
          <FontAwesome5 name="search-location" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
      {isSearching && (
        <View
          className="absolute w-full  bg-white"
          style={{
            backgroundColor: isDark ? "#000000" : "#ffffff",
            top: orientation === "landscape" ? 68 : 90,
            right: 0,
            padding: 4,
            display: "flex",
            height: height + 40 - (orientation === "landscape" ? 64 : 80),
          }}
        >
          <View className="flex gap-4 justify-between flex-row items-center">
            <Text
              className=" font-bold text-xl"
              style={{
                color: isDark ? "#ffffff" : "#000000",
              }}
            >
              Search for location...
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                Keyboard.dismiss();
              }}
              className="p-2"
            >
              <FontAwesome5 name="times" size={20} color={"red"} />
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            {isLoading ? (
              <View
                className="flex items-center justify-center"
                style={{
                  height: height - 200,
                }}
              >
                <Text>Loading...</Text>
              </View>
            ) : isError ? (
              <View
                className="flex items-center justify-center"
                style={{
                  height: height - 200,
                }}
              >
                <Text>Loading...</Text>
              </View>
            ) : cities.length === 0 ? (
              <View
                className="flex items-center justify-center"
                style={{
                  height: height - 200,
                }}
              >
                <Text
                  className="text-bold text-2xl"
                  style={{
                    color: colors.danger,
                  }}
                >
                  No results found
                </Text>
              </View>
            ) : (
              <FlatList
                data={cities || []}
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
                      setSearch(item?.name);
                      Keyboard.dismiss();
                      setIsSearching(false);
                    }}
                    style={{
                      padding: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: "#f0f0f0",
                    }}
                  >
                    <View className="flex flex-row gap-2 items-center ">
                      <FontAwesome5
                        name="map-pin"
                        size={20}
                        color={"#7f7f7f"}
                      />
                      <Text
                        className="font-bold"
                        style={{
                          color: isDark ? "#ffffff" : "#000000",
                        }}
                      >
                        {item?.name}
                      </Text>
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
      )}
    </BlurView>
  );
}
export default function App() {
  const { setError, isDark, setIsDark } = useStore();
  const client = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => {
        setError(error.message || "An error occurred");
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const systemColorScheme = useColorScheme();

  const theme = isDark ? darkTheme : lightTheme;

  // useEffect(() => {
  //   setIsDark(systemColorScheme === "dark");
  // }, [systemColorScheme]);

  return (
    <QueryClientProvider client={client}>
      <NavigationContainer theme={theme}>
        <ImageBackground
          source={
            isDark
              ? require("./assets/night.jpeg")
              : require("./assets/morning.jpg")
          }
          style={{ width: "100%", height: "100%" }}
        >
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
              header: Header,
            }}
          >
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
          <StatusBar style={isDark ? "light" : "dark"} />
        </ImageBackground>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
