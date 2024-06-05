import { Stack } from "expo-router";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { useStore } from "../store";
const LayoutApp = () => {
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
