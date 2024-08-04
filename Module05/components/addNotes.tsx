import { View, Text } from "react-native";
import React from "react";

interface AddNotesProps {
  show: boolean;
  onChanges: (show: boolean) => void;
}
const AddNotes = ({ show, onChanges }: AddNotesProps) => {
  return <View className="flex flex-1 bg-red-500"></View>;
};

export default AddNotes;
