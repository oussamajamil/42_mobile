import { View, Text, Platform } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabsIcon from "@/components/tabsIcon";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
const isIos = Platform.OS === "ios";
const LayoutHome = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <TabsIcon
              name="profile"
              icon={<FontAwesome name="user" size={24} color={color} />}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <TabsIcon
              name="list"
              icon={<FontAwesome name="calendar" size={24} color={color} />}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default LayoutHome;
