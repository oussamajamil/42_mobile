import { View, Text, Image } from "react-native";
import React, { ReactChild } from "react";
import { Settings } from "lucide-react-native";
const TabsIcon = ({
  icon,
  color,
  focused,
  name,
}: {
  icon: ReactChild;
  color: string;
  focused: boolean;
  name: string;
}) => {
  return (
    // className="flex items-center justify-center gap-2"
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      {icon}
      <Text
        style={{
          color: color,
          fontSize: 12,
          fontWeight: focused ? "600" : "400",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabsIcon;
