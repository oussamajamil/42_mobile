import { Stack } from "expo-router";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { useStore } from "../store";
import { useEffect, useState } from "react";
const LayoutApp = () => {
  const [theme, setTheme] = useState("day");
  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour >= 6 && currentHour < 18) setTheme("day");
    else setTheme("night");
  }, []);
  const { setError } = useStore();
  const client = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => {
        setError(error.message || "An error occurred");
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <Stack>
        <Stack.Screen
          name="(tab)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default LayoutApp;
