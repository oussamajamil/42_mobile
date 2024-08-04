import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { hp, wp } from "@/helpers/common";
import FeelingComp from "@/components/feeling";
import Button from "@/components/Button";
import { findOneWithId, UpdateData } from "@/utils/firebase";
import { useStore } from "@/store";
import useSWR from "swr";
import { updateCurrentUser } from "firebase/auth";
import Loading from "@/components/Loading";
import { serverTimestamp, Timestamp } from "firebase/firestore";

const EditNotes = () => {
  const { user } = useStore();
  const { id } = useLocalSearchParams();
  const [selected, setSelected] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState<string | null>(null);

  const { data, isLoading, error } = useSWR(
    `notesDetail/${id}`,
    async () => {
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
    },
    {
      onSuccess: (data) => {
        setTitle(data.title);
        setContent(data.content);
        setSelected(data.feeling);
        setType(data.type);
      },
    }
  );

  useEffect(() => {
    if (!user) {
      router.push("welcome");
    }
  }, [user]);

  const updateNote = async () => {
    try {
      setLoading(true);
      if (!title || !content || !selected || !type) {
        alert("Please fill all fields");
      } else {
        await UpdateData("notes", id as string, {
          title,
          content,
          feeling: selected,
          date: serverTimestamp(),
          uid: user.uid,
          type: type,
          userEmail: user.email,
        });
        router.replace("list");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View className="flex-1  p-6 relative">
          <Text className="text-2xl font-bold">Edit Note</Text>
          <View className="flex-1 items-center justify-center">
            <Loading />
          </View>
        </View>
      </ScreenWrapper>
    );
  }
  return (
    <ScreenWrapper>
      <ScrollView>
        <View className="flex relative flex-1 items-center">
          <View className="absolute  left-1">
            <TouchableOpacity
              onPress={() => router.replace("list")}
              className="bg-gray-200 p-2 rounded-md"
            >
              <FontAwesome name="arrow-left" size={15} />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-bold">Edit Note</Text>
          <View
            className="flex-1 w-full flex-col"
            style={{
              padding: wp(10),
              gap: hp(2),
            }}
          >
            <View
              className="flex-col"
              style={{
                gap: hp(1),
              }}
            >
              <Text className="font-bold">Title</Text>
              <TextInput
                onChangeText={(val) => {
                  setTitle(val);
                }}
                value={title || data?.title}
                className="border p-2 rounded-md"
              />
            </View>
            <View
              className="flex-col "
              style={{
                gap: hp(1),
              }}
            >
              <Text className="font-bold">Content</Text>
              <TextInput
                value={content || data?.content}
                multiline
                onChangeText={(val) => {
                  setContent(val);
                }}
                className="border p-2 rounded-md"
                style={{
                  height: hp(20),
                }}
              />
            </View>
            <View
              className="flex-col"
              style={{
                gap: hp(1),
              }}
            >
              <View
                className="border p-2 rounded-md flex flex-row flex-wrap"
                style={{
                  gap: wp(2),
                  minHeight: hp(10),
                }}
              >
                <FeelingComp
                  selected={selected || data?.feeling}
                  onValueChange={(val) => {
                    setType(val.type);
                    setSelected(val.name);
                  }}
                />
              </View>
            </View>
            <Button
              buttonStyle={{
                margin: wp(2),
              }}
              text="Edit Note"
              onPress={async () => {
                await updateNote();
              }}
              isLoading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default EditNotes;
