import { View, Text } from "react-native";
import React from "react";
import { useStore } from "../../store";

const Weekly = () => {
  const { search } = useStore();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        Weekly
      </Text>
      <Text>{search}</Text>
    </View>
  );
};

export default Weekly;
