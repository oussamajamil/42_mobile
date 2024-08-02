import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import useSWR from "swr";
import { DeleteData, findOneWithId } from "@/utils/firebase";
import { useStore } from "@/store";
import Loading from "@/components/Loading";
import { feelingData } from "@/components/feeling";
import { NotesType } from "../../home";
import { FontAwesome } from "@expo/vector-icons";
import { hp, wp } from "@/helpers/common";
import Button from "@/components/Button";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { convertFirestoreTimestampToDate } from "@/utils/createTokenWithCode";

const DetailPage = () => {
  const { id } = useLocalSearchParams();
  const { user } = useStore();
  const [loadingDelete, setLoadingDelete] = React.useState(false);
  const {
    data: res,
    error,
    isLoading,
  } = useSWR(`notesDetail/${id}`, async () => {
    try {
      if (!id) {
        return null;
      }

      const dt: any = await findOneWithId("notes", id as string);
      return dt;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  const deleteNote = async () => {
    try {
      setLoadingDelete(true);
      if (!id) {
        alert("An error occurred");
      } else {
        const res = await DeleteData("notes", id as string);
        router.push("list");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    } finally {
      setLoadingDelete(false);
    }
  };

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1  p-6 relative">
          <Text className="text-2xl font-bold">Detail</Text>
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
        <View className="flex flex-row gap-5 items-center">
          <TouchableOpacity
            onPress={() => router.push("list")}
            className="bg-gray-200 p-2 rounded-md"
          >
            <FontAwesome name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Detail</Text>
        </View>
        <View className="flex-1 mt-4">
          <View className="flex items-center justify-center">
            <Text className="text-8xl">
              {feelingData.find((i) => i.name === res?.feeling)?.icon}
            </Text>
            <Text className="text-2xl font-thin">{res?.title}</Text>
          </View>
          <View
            className="flex mt-4 border border-gray-300 p-4 shadow-lg shadow-slate-200"
            style={{
              borderRadius: 10,
              height: hp(40),
            }}
          >
            <Text className="text-lg font-light  flex-1">{res?.content}</Text>
            <View className="flex items-center justify-end flex-row  mt-2 gap-2">
              <FontAwesome
                name="history"
                size={15}
                color={"red"}
                className="ml-2"
              />
              <Text className="text-sm text-gray-500 text-end ">
                {format(
                  convertFirestoreTimestampToDate(res?.date),
                  "dd MMM yyyy hh:mm a"
                )}
              </Text>
            </View>
          </View>
          <View
            className="flex  gap-4 flex-row  mt-6"
            style={{
              gap: wp(4),
            }}
          >
            <Button
              buttonStyle={{
                backgroundColor: "red",
                borderRadius: 10,
                dispaly: "flex",
                flex: 1,
                items: "center",
                justify: "center",
              }}
              isLoading={loadingDelete}
              icon={<FontAwesome name="trash" size={22} color={"white"} />}
              text="delete"
              onPress={async () => {
                await deleteNote();
              }}
            />
            <Button
              buttonStyle={{
                backgroundColor: "green",
                borderRadius: 10,
                dispaly: "flex",
                flex: 1,
                items: "center",
                justify: "center",
              }}
              icon={<FontAwesome name="edit" size={22} color={"white"} />}
              text="edit"
              onPress={() => {
                router.push(`list/details/edit/${id}`);
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default DetailPage;
