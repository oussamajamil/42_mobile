import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
export default function App() {
  return (
    <SafeAreaView
      className="flex items-center justify-center gap-4"
      style={{
        flex: 1,
        backgroundColor: "black",
        opacity: 0.8,
      }}
    >
      <Text className="text-2xl font-bold text-white">
        First app with react native
      </Text>
      <TouchableOpacity
        className="border p-2 bg-red-500 rounded-lg"
        style={{
          borderColor: "red",
        }}
        onPress={() => {
          console.log("Button pressed");
        }}
      >
        <Text className="text-white text-xl ">click me</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
