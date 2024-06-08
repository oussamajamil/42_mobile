import { View, Text } from "react-native";
import React from "react";
import { useStore } from "../store";

const LocationComponent = () => {
  const { position } = useStore();
  return (
    <View className="flex flex-col gap-2 px-2 items-center justify-center">
      {position ? (
        <>
          <Text className="text-md font-semibold">
            <Text className="text-lg font-bold">City :</Text>
            {position?.city}
          </Text>
          <Text className="text-md font-semibold">
            <Text className="text-lg font-bold">Region :</Text>
            {position?.region}
          </Text>
          <Text className="text-md font-semibold">
            <Text className="text-lg font-bold">Country :</Text>
            {position?.country}
          </Text>
        </>
      ) : (
        <Text className="text-lg font-semibold">No location found</Text>
      )}
    </View>
  );
};

export default LocationComponent;
