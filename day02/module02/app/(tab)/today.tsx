import { View, Text } from "react-native";
import { useStore } from "../../store";

const Today = () => {
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
        Today
      </Text>
      <Text>{search}</Text>
    </View>
  );
};

export default Today;
