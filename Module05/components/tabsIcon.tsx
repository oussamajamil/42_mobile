import { View, Text, Image, Dimensions } from "react-native";
import React, { ReactChild } from "react";
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
      className="items-center justify-center gap-1"
      style={{
        width: Dimensions.get("screen").width / 3,
      }}
    >
      {icon}
      <Text
        className="font-[6]"
        style={{
          color: color,
          fontWeight: focused ? "600" : "400",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabsIcon;
