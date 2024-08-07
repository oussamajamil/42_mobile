import { View, Text } from "react-native";
import React from "react";

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <View
      className={className}
      style={{
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        padding: 20,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {children}
    </View>
  );
};

export default Card;
