import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { NotesType } from "../home";
import { useStore } from "@/store";
import useSWR from "swr";
import { getWithUserIdOrType } from "@/utils/firebase";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { router } from "expo-router";
import Loading from "@/components/Loading";
import { feelingData } from "@/components/feeling";

const List = () => {
  const { user } = useStore();
  const {
    data: res,
    error,
    isLoading,
  } = useSWR("notesList", async () => {
    try {
      const dt: NotesType[] = await getWithUserIdOrType("notes", user.uid);
      return dt;
    } catch (error) {
      console.log(error);
      return [];
    }
  });
  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1  p-6 relative">
          <Text className="text-2xl font-bold">List</Text>
          <View className="flex-1 items-center justify-center">
            <Loading />
          </View>
        </View>
      </ScreenWrapper>
    );
  }
  return (
    <ScreenWrapper>
      <View className="flex-1  p-6 relative">
        <Text className="text-2xl font-bold">List</Text>
        <View>
          {res?.map((item: NotesType, index: number) => (
            <View
              key={index}
              className="bg-white shadow-lg p-4 rounded-lg border border-gray-300  shadow-slate-200 my-2 relative"
              style={{
                elevation: 2,
              }}
            >
              <Text className="text-lg font-bold">
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
                <Text className="text-sm">{item.date}</Text>
              </View>
              {/* / show mor icon/ */}
              <TouchableOpacity
                className="absolute top-2 right-2"
                // list/details/[id]
                onPress={() => router.push(`list/details/${item.id}`)}
              >
                <FontAwesome name="edit" size={20} color={"black"} />
              </TouchableOpacity>
            </View>
          ))}
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
};

export default List;
