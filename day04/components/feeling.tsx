import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const feelingData = [
  { icon: "😀", name: "Happy", color: "#FFFF00" }, // Yellow
  { icon: "😢", name: "Sad", color: "#0000FF" }, // Blue
  { icon: "😡", name: "Angry", color: "#FF0000" }, // Red
  { icon: "😴", name: "Sleepy", color: "#800080" }, // Purple
  { icon: "😱", name: "Scared", color: "#FFA500" }, // Orange
  { icon: "😎", name: "Cool", color: "#000000" }, // Black
  { icon: "😇", name: "Blessed", color: "#FFD700" }, // Gold
  { icon: "😍", name: "In Love", color: "#FF69B4" }, // Pink
  { icon: "😜", name: "Silly", color: "#FF00FF" }, // Magenta
  { icon: "😷", name: "Sick", color: "#808080" }, // Gray
  { icon: "😵", name: "Dizzy", color: "#00FF00" }, // Green
  { icon: "🤢", name: "Nauseous", color: "#808000" }, // Olive
  { icon: "🤒", name: "Feverish", color: "#800000" }, // Maroon
  { icon: "🤕", name: "Hurt", color: "#A52A2A" }, // Brown
  { icon: "🤧", name: "Sneezy", color: "#ADD8E6" }, // Light Blue
  { icon: "🤠", name: "Cowboy", color: "#DEB887" }, // Burly Wood
  { icon: "🤡", name: "Clown", color: "#FF4500" }, // Orange Red
  { icon: "🤥", name: "Liar", color: "#4B0082" }, // Indigo
];
const FeelingComp = ({
  selected,
  onValueChange,
}: {
  selected: string;
  onValueChange: (value: string) => void;
}) => {
  const [select, setSelect] = React.useState(selected);
  return (
    <View className="w-full h-full">
      <Text className="text-2xl font-bold">How are you feeling?</Text>
      <View
        className="flex flex-row flex-wrap gap-2 p-2 
      "
      >
        {feelingData.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setSelect(item.name);
              onValueChange(item.name);
            }}
            key={index}
            className="flex items-center justify-center p-2 bg-gray-200 rounded-lg w-10 h-10
            "
            style={{
              backgroundColor:
                select === item.name ? Colors.primary : "#e5e7eb",
            }}
          >
            <Text>{item.icon}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FeelingComp;
