import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Currently from "./tabs/currently";
import Today from "./tabs/today";
import Weekly from "./tabs/weekly";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AntDesign } from "@expo/vector-icons";
import { useOrientation } from "../../hooks/useOrientation";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store";
import { getLocations } from "../../api";
import { FontAwesome5 } from "@expo/vector-icons";
const Tab = createMaterialTopTabNavigator();
function Main() {
  const orientation = useOrientation();
  const { location, setPosition, setLoadingGlobal } = useStore();
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
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarIndicatorStyle: { display: "none" },
        tabBarInactiveTintColor: "white",
        tabBarItemStyle: {
          flexDirection: orientation === "landscape" ? "row" : "column",
        },
        tabBarContentContainerStyle: {
          backgroundColor: "gray",
          opacity: 0.7,
        },
      }}
      tabBarPosition="bottom"
    >
      <Tab.Screen
        name="Currently"
        component={Currently}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-check" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Today"
        component={Today}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-day" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Weekly"
        component={Weekly}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-week" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Main;
