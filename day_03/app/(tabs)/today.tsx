import { View, Text } from "react-native";
import React from "react";
import { useStore } from "@/store/store";

const Today = () => {
  const { selectPosition } = useStore();
  return <View>{/* <Text>{JSON.stringify(selectPosition)}</Text> */}</View>;
};

export default Today;
