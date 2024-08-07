import { View, Text, Pressable } from "react-native";
import React from "react";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Loading from "./Loading";

const Button = ({
  buttonStyle,
  textStyle,
  text,
  onPress,
  icon,
  isLoading = false,
  hasShadow = true,
  iconLeft = false,
}: {
  buttonStyle?: any;
  textStyle?: any;
  text: string;
  onPress: () => void;
  icon?: any;
  isLoading?: boolean;
  hasShadow?: boolean;
  iconLeft?: boolean;
}) => {
  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
  };
  if (isLoading) {
    return (
      <View
        style={[
          {
            backgroundColor: theme.colors.primary,
            height: hp(6.5),
            justifyContent: "center",
            alignItems: "center",
            borderCurve: "continuous",
            borderRadius: theme.radius.xl,
          },
          buttonStyle,
          { opacity: 0.5 },
        ]}
      >
        <Loading />
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.colors.primary,
          height: hp(6.5),
          justifyContent: "center",
          alignItems: "center",
          borderCurve: "continuous",
          borderRadius: theme.radius.xl,
        },
        buttonStyle,
        hasShadow && shadowStyle,
      ]}
    >
      <View className="flex justify-center gap-3 flex-row">
        {icon && iconLeft && icon}
        <Text
          style={[
            {
              fontSize: hp(2.5),
              color: "white",
              fontWeight: theme.fonts.bold,
            },
            textStyle,
          ]}
        >
          {text}
        </Text>
        {icon && !iconLeft && icon}
      </View>
    </Pressable>
  );
};

export default Button;
