import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
const Loading = ({
  size = "large",
  color = theme.colors.primary,
}: {
  size?: number | "small" | "large";
  color?: string;
}) => {
  return (
    <View className="flex items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;
