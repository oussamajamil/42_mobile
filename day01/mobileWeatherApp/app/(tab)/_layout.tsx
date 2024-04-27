import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import TabsIcon from "../../components/TabsIcon";
import { Calendar, CalendarDays, MapPin, Settings } from "lucide-react-native";
import { useStore } from "../../store";

const _layout = () => {
  const { search, setSearch } = useStore();
  const [stateSearchm, setStateSearch] = React.useState("");
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
            height: 70,
          },
          //   headerShown: false,
          header: (props) => (
            <SafeAreaView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  backgroundColor: "#A3D8FF",
                }}
              >
                <TextInput
                  value={stateSearchm}
                  onChangeText={(text) => setStateSearch(text)}
                  style={{
                    padding: 8,
                    backgroundColor: "#f2f2f2",
                    borderRadius: 10,
                    width: "80%",
                  }}
                  placeholder="Search"
                />
                <TouchableOpacity
                  onPress={() => {
                    setSearch(stateSearchm);
                  }}
                  style={{
                    backgroundColor: "#FFA001",
                    padding: 8,
                    borderRadius: 100,
                  }}
                >
                  <MapPin color="white" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          ),
        }}
      >
        <Tabs.Screen
          name="today"
          options={{
            tabBarIcon: ({ color, focused }) => (
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
          name="currently"
          options={{
            tabBarIcon: ({ color, focused }) => (
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
          name="weekly"
          options={{
            tabBarIcon: ({ color, focused }) => (
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
