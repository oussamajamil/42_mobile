import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, Tabs } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CitiesItem } from "@/utils/types";
import { useStore } from "@/store/store";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [stateSearch, setStateSearch] = React.useState("");
  const {
    setSelectPosition,
    currentPosition,
    setError,
    setInformationCity,
    selectPosition,
  } = useStore();
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
          `https://geocoding-api.open-meteo.com/v1`,
          {
            params: {
              name: stateSearch,
              count: 5,
            },
          }
        );
        if (!data.data.results) throw new Error("no results found");
        return data?.data?.results || [];
      } catch (e) {
        throw new Error("An error occurred");
      }
    },
  });

  useQuery({
    queryKey: ["locations", selectPosition],
    queryFn: async () => {
      try {
        const data = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectPosition?.latitude}&lon=${selectPosition?.longitude}&addressdetails=1`
        );
        if (data.status !== 200) {
          throw new Error("Network response was not ok " + data.statusText);
        }
        if (!data.data || data.data.error) {
          throw new Error(
            "Nominatim API error: " + (data.data.error || "Unknown error")
          );
        }
        const address = data.data.address;
        const location = {
          country: address.country,
          region: address?.state || address?.region || address?.county,
          city: address?.city || address?.town || address?.village,
        };
        setInformationCity(location);
        return location;
      } catch (error: any) {
        setError(error.message || "An error occurred");
      }
    },
  });

  const height = Dimensions.get("window").height;
  const width = Dimensions.get("window").width;
  return (
    <>
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: "center",
          opacity: 0.9,
        }}
        source={
          colorScheme === "dark"
            ? require("../../assets/images/night.jpeg")
            : require("../../assets/images/morning.jpg")
        }
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "transparent",
          }}
        >
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              tabBarStyle: {
                backgroundColor: "transparent",
                height: 60,
                borderTopWidth: 0,
                elevation: 0,
                paddingBottom: 5,
              },
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "bold",
              },
              header: () => (
                <>
                  <View className="w-full h-10 border border-gray-500/30 shadow-md bg-gray-500/20  px-2  items-center justify-center flex flex-row relative">
                    <TabBarIcon name="search" color="#FFA001" />
                    <TextInput
                      className="border-none outline-none  flex-1 px-2"
                      placeholder="Search"
                      value={stateSearch}
                      onChangeText={(text) => {
                        setStateSearch(text);
                        if (text.length > 2) {
                          setVisible(true);
                        } else {
                          setVisible(false);
                        }
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setStateSearch("");
                        setVisible(false);
                        if (currentPosition) {
                          setSelectPosition({
                            latitude: currentPosition.coords.latitude,
                            longitude: currentPosition.coords.longitude,
                          });
                        } else {
                          setSelectPosition(null);
                          setError("No location found");
                        }
                      }}
                    >
                      <TabBarIcon name="gps-fixed" color="#FFA001" />
                    </TouchableOpacity>
                    <View
                      className="absolute w-full left-0"
                      style={{
                        height: height,
                        width: width,
                        backgroundColor:
                          colorScheme === "dark" ? "black" : "white",
                        position: "absolute",
                        zIndex: 100,
                        top: 40,
                        left: 0,
                        display: visible ? "flex" : "none",
                      }}
                    >
                      {isLoading && !isError ? (
                        <View className="flex items-center justify-center h-full">
                          <Text>Loading...</Text>
                        </View>
                      ) : isError ? (
                        <View className="flex items-center justify-center h-full text-red-500">
                          <Text>Error...</Text>
                        </View>
                      ) : (
                        <FlatList
                          data={cities}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item }: { item: CitiesItem }) => (
                            <TouchableOpacity
                              onPress={() => {
                                setStateSearch(item.name);
                                setVisible(false);
                                setSelectPosition({
                                  latitude: item.latitude,
                                  longitude: item.longitude,
                                });
                              }}
                            >
                              <View className="flex flex-row items-center p-2 border-b border-gray-500/30 ">
                                <Text>{item.name}</Text>
                                <Text className="text-gray-500 truncate">{`   (${item.country}, ${item.admin1})`}</Text>
                              </View>
                            </TouchableOpacity>
                          )}
                        />
                      )}
                    </View>
                  </View>
                </>
              ),
            }}
          >
            <Tabs.Screen
              name="currently"
              options={{
                title: "currently",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="settings" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="today"
              options={{
                title: "today",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="watch-later" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="weekly"
              options={{
                title: "weekly",
                tabBarIcon: ({ color }) => (
                  <TabBarIcon name="view-timeline" color={color} />
                ),
              }}
            />
          </Tabs>
        </SafeAreaView>
      </ImageBackground>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </>
  );
}
