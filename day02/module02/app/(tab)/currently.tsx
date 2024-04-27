import { View, Text } from "react-native";
import { useStore } from "../../store";

const Currently = () => {
  const { location } = useStore();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {location ? (
        <>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Currently
          </Text>
          <Text>{location?.latitude + "," + location?.longitude}</Text>
        </>
      ) : (
        <Text
          style={{
            color: "red",
            fontSize: 14,
            paddingHorizontal: 16,
          }}
        >
          Geolocation is not available, please it in your App settings
        </Text>
      )}
    </View>
  );
};

export default Currently;
