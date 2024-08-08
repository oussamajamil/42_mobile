import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { theme } from "@/constants/theme";
import { useStore } from "@/store";
import Toast from "react-native-toast-message";

const App = () => {
  const { loading } = useStore();
  const ref = React.useRef(null);
  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center">
        {loading && (
          <ActivityIndicator size={"large"} color={theme.colors.primary} />
        )}
        <Toast />
      </View>
    </ScreenWrapper>
  );
};

export default App;
