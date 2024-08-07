import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const feelingData = [
  { icon: "😀", name: "Happy", color: "#FFFF00", type: "positive" }, // Yellow
  // Yellow
  { icon: "😢", name: "Sad", color: "#0000FF", type: "negative" }, // Blue
  { icon: "😡", name: "Angry", color: "#FF0000", type: "negative" }, // Red
  { icon: "😴", name: "Sleepy", color: "#800080", type: "neutral" }, // Purple

  { icon: "😱", name: "Scared", color: "#FFA500", type: "negative" },
  { icon: "😎", name: "Cool", color: "#000000", type: "positive" }, // Black
  { icon: "😇", name: "Blessed", color: "#FFD700", type: "positive" }, // Gold

  { icon: "😍", name: "In Love", color: "#FF69B4", type: "positive" }, // Pink

  { icon: "😜", name: "Silly", color: "#FF00FF", type: "positive" }, // Magenta

  { icon: "😷", name: "Sick", color: "#808080", type: "negative" }, // Gray
  { icon: "😵", name: "Dizzy", color: "#00FF00", type: "negative" }, // Lime

  { icon: "🤢", name: "Nauseous", color: "#808000", type: "negative" }, // Olive

  { icon: "🤒", name: "Feverish", color: "#800000", type: "negative" }, // Maroon
  { icon: "🤕", name: "Hurt", color: "#A52A2A", type: "negative" }, // Brown

  { icon: "🤧", name: "Sneezy", color: "#ADD8E6", type: "negative" }, // Light Blue
  {
    icon: "🤠",
    name: "Cowboy",
    color: "#DEB887",
    type: "positive",
  }, // Burly Wood

  { icon: "🤥", name: "Liar", color: "#4B0082", type: "negative" }, // Indigo
];
const FeelingComp = ({
  selected,
  onValueChange,
}: {
  selected: string;
  onValueChange: ({ name, type }: { name: string; type: string }) => void;
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
              onValueChange({
                name: item.name,
                type: item.type,
              });
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
