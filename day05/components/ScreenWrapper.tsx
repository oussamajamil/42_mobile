import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({
  children,
  className,
  bg,
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  return (
    <View
      className={
        "flex-1 w-full h-full relative" + (className ? ` ${className}` : "")
      }
      style={{
        flex: 1,
        backgroundColor: bg || "white",
        paddingTop,
      }}
    >
      {children}
    </View>
  );
};

export default ScreenWrapper;
