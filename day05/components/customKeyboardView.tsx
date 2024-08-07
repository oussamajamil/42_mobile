import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";

const ios = Platform.OS === "ios";
const CustomKeyboardView = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
