import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useStore } from "@/store";
import { hp, wp } from "@/helpers/common";
import { signOut } from "@firebase/auth";
import { FirebaseAuth, getWithUserIdOrType } from "@/utils/firebase";
import { router } from "expo-router";
import useSWR, { mutate } from "swr";
import { Colors } from "react-native/Libraries/NewAppScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { feelingData } from "@/components/feeling";
import Loading from "@/components/Loading";
import { format } from "date-fns";

export interface NotesType {
  title: string;
  id?: string;
  feeling: string;
  content: string;
  uid: string;
  date: Date;
}
const HomeScreen = () => {
  const { user } = useStore();
  useEffect(() => {
    if (!user) {
      router.push("welcome");
    }
  }, [user]);

  const {
    data: res,
    error,
    isLoading,
    isValidating,
  } = useSWR("notesHome", async () => {
    const dt: NotesType[] = await getWithUserIdOrType("notes", user.uid);

    return (
      dt
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 2) || []
    );
  });

  return (
    <View className="flex-1">
      <View
        className="flex relative items-center justify-end pb-4"
        style={{
          width: wp(100),
          height: wp(60),
          backgroundColor: Colors.primary,
          borderBottomLeftRadius: wp(10),
          borderBottomRightRadius: wp(10),
        }}
      >
        <View className="absolute top-12 right-6">
          <TouchableOpacity
            onPress={() => {
              signOut(FirebaseAuth);
            }}
          >
            <FontAwesome name="sign-out" size={wp(6)} color={"white"} />
          </TouchableOpacity>
        </View>
        {user?.photoURL ? (
          <Image
            className="rounded-full"
            source={{ uri: user?.photoURL }}
            style={{
              width: wp(30),
              height: wp(30),
            }}
          />
        ) : (
          <View
            className="border rounded-full overflow-hidden flex items-center justify-center bg-gray-400"
            style={{
              width: wp(35),
              height: wp(35),
            }}
          >
            <FontAwesome name="user" size={wp(30)} />
          </View>
        )}
        <Text
          style={{
            color: Colors.white,
            fontSize: wp(6),
          }}
        >
          {user?.displayName || "user Name"}
        </Text>
      </View>
      <View className="flex-1 relative">
        {isLoading || isValidating ? (
          <View className="flex-1 items-center justify-center">
            <Loading />
          </View>
        ) : (res || [])?.length > 0 ? (
          <View
            className="flex-1  relative p-6 flex "
            style={{
              gap: hp(2),
            }}
          >
            <View
              className="bg-white rounded-md shadow-md flex items-center   p-5 shadow-slate-400"
              style={{
                gap: hp(1),
                backgroundColor: feelingData.find(
                  (f) => f.name === res?.[0]?.feeling
                )?.color,
              }}
            >
              <Text className="text-xl">Your last feeling </Text>
              <Text className="text-4xl">
                {feelingData.find((f) => f.name === res?.[0]?.feeling)?.icon}
              </Text>
            </View>
            <View className="flex-1 relative">
              <Text className="font-bold mb-2 text-lg">last 2 notes</Text>
              <ScrollView
                className="flex flex-col gap-2"
                style={{
                  gap: hp(2),
                }}
              >
                {res?.map((note, index: number) => (
                  <View
                    key={index}
                    className="flex bg-white  rounded-md p-4 shadow-black/20 shadow-md drop-shadow-xl relative "
                    style={{
                      gap: 2,
                    }}
                  >
                    <Text className="font-bold text-lg">
                      {note.title}
                      <Text>
                        {
                          feelingData.find((f) => f?.name === note.feeling)
                            ?.icon
                        }
                      </Text>
                    </Text>
                    <Text className="text-sm w-full truncate">
                      {note.content}
                    </Text>
                    <View className="mt-2  justify-end gap-2 flex flex-row items-center ">
                      <FontAwesome name="history" size={15} color={"red"} />
                      <Text>{new Date(note?.date) + ""}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
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
        ) : (
          <View className="flex-1 items-center justify-center relative">
            <Text className="text-2xl text-red-500">No data found</Text>
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
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
