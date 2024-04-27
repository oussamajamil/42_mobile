import { Stack } from "expo-router";

const LayoutApp = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tab)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default LayoutApp;
