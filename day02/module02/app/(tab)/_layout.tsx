import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import TabsIcon from "../../components/TabsIcon";
import {
  Calendar,
  CalendarDays,
  MapPin,
  Search,
  Settings,
} from "lucide-react-native";
import { useStore } from "../../store";
import * as Location from "expo-location";
import axios from "axios";

const _layout = () => {
  const { setLocation } = useStore();
  const [stateSearch, setStateSearch] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [cities, setCities] = React.useState([]);

  useEffect(() => {
    try {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (stateSearch.length === 0) {
      setCities([]);
      return;
    }
    if (stateSearch.length >= 2) {
      (async () => {
        try {
          const data = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${stateSearch}`
          );
          setCities(data?.data?.results || []);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [stateSearch]);

  const height = Dimensions.get("window").height;
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#A3D8FF",
            borderTopWidth: 1,
            borderTopColor: "#A3D8FF",
            height: 60,
          },
          header: () => (
            <SafeAreaView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: "#A3D8FF",
                  position: "relative",
                }}
              >
                <View
                  style={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <Search color="white" size={20} />
                  <TextInput
                    id="search"
                    onFocus={() => setVisible(true)}
                    onBlur={() => setVisible(false)}
                    value={stateSearch}
                    onChangeText={(text: string) => setStateSearch(text)}
                    style={{
                      padding: 8,
                      backgroundColor: "transparent",
                      borderRadius: 10,
                    }}
                    placeholder="Search...."
                  />
                </View>
                <TouchableOpacity
                  onPress={async () => {}}
                  style={{
                    backgroundColor: "#FFA001",
                    padding: 6,
                    borderRadius: 100,
                  }}
                >
                  <MapPin color="white" />
                </TouchableOpacity>
                <ScrollView
                  style={{
                    position: "absolute",
                    top: 60,
                    left: 0,
                    right: 0,
                    height: height - 60,
                    backgroundColor: "white",
                    display: visible ? "flex" : "none",
                  }}
                >
                  {cities?.length === 0 ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 20,
                        }}
                      >
                        No results
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={cities}
                      renderItem={({
                        item,
                      }: {
                        item: {
                          id: string;
                          name: string;
                          latitude: number;
                          longitude: number;
                        };
                      }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setLocation({
                              latitude: item?.latitude,
                              longitude: item?.longitude,
                            });
                            setStateSearch(item?.name);
                            setCities([]);
                          }}
                          style={{
                            padding: 8,
                            borderBottomWidth: 1,
                            borderBottomColor: "#f0f0f0",
                          }}
                        >
                          <Text>{item?.name}</Text>
                        </TouchableOpacity>
                      )}
                      keyExtractor={(item) => item?.id}
                    />
                  )}
                </ScrollView>
              </View>
            </SafeAreaView>
          ),
        }}
      >
        <Tabs.Screen
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
      <StatusBar style="auto" backgroundColor="#A3D8FF" />
    </>
  );
};

export default _layout;
