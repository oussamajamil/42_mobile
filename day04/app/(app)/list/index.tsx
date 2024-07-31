import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { NotesType } from "../home";
import { useStore } from "@/store";
import useSWR, { mutate } from "swr";
import { getWithUserIdOrType } from "@/utils/firebase";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { router } from "expo-router";
import Loading from "@/components/Loading";
import { feelingData } from "@/components/feeling";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

const List = () => {
  const { user } = useStore();
  const [type, setType] = React.useState<string>("all");
  const {
    data: res,
    error,
    isLoading,
    isValidating,
  } = useSWR(`notesList${type}`, async () => {
    const dt: NotesType[] = await getWithUserIdOrType("notes", user.uid, type);
    return dt || null;
  });
  useEffect(() => {
    if (!user) {
      router.push("welcome");
    }
  }, [user]);

  if (error) {
    return (
      <ScreenWrapper>
        <View className="flex-1  p-6 relative">
          <Text className="text-2xl font-bold">List</Text>
          <View className="flex-1 items-center justify-center">
            <Text className="text-red-500">An error occurred</Text>
          </View>
          <TouchableOpacity
            className="h-16 w-16 flex items-center justify-center rounded-full absolute bottom-4 right-4"
            style={{
              backgroundColor: Colors.primary,
            }}
            onPress={() => router.push("home/addNotes")}
          >
            <FontAwesome name="plus" size={20} color={"white"} />
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }
  return (
    <ScreenWrapper>
      <View className="flex-1  p-6 relative">
        <Text className="text-2xl font-bold">List</Text>
        <View>
          <ScrollView className="flex flex-row gap-4 mt-1" horizontal>
            {["all", "positive", "negative", "neutral"].map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  className="border p-2 rounded-md"
                  style={{
                    backgroundColor: type === item ? Colors.primary : "white",
                  }}
                  onPress={() => setType(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        {isLoading || isValidating ? (
          <View className="flex-1 items-center justify-center">
            <Loading />
          </View>
        ) : (res || [])?.length > 0 ? (
          <ScrollView className="mt-2">
            {(res || [])?.map((item: NotesType, index: number) => (
              <View
                key={index}
                className="bg-white shadow-lg p-2 rounded-lg border border-gray-300  shadow-slate-200 my-2 relative"
              >
                <Text className="text-lg font-bold p-2 w-full truncate">
                  {item.title}
                  <Text className="font-normal text-gray-500 text-xs">
                    {` (${item.feeling}  ${
                      feelingData.find((i) => i.name === item.feeling)?.icon
                    })`}
                  </Text>
                </Text>
                <Text className="text-sm">{item.content}</Text>
                <View className="flex flex-row items-center justify-end gap-2">
                  <FontAwesome name="history" size={14} color={"red"} />
                  <Text className="text-sm">
                    {format(new Date(item?.date), "dd MMM yyyy hh:mm a")}
                  </Text>
                </View>
                {/* / show mor icon/ */}
                <TouchableOpacity
                  className="absolute top-2 right-2"
                  onPress={() => router.push(`list/details/${item.id}`)}
                >
                  <FontAwesome name="edit" size={20} color={"black"} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center relative">
            <Text className="text-2xl text-red-500">No data found</Text>
          </View>
        )}
        <TouchableOpacity
          className="h-16 w-16 flex items-center justify-center rounded-full absolute bottom-4 right-4"
          style={{
            backgroundColor: Colors.primary,
          }}
          onPress={() => router.push("home/addNotes")}
        >
          <FontAwesome name="plus" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default List;
