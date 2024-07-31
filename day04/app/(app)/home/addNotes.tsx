import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { hp, wp } from "@/helpers/common";
import FeelingComp from "@/components/feeling";
import Button from "@/components/Button";
import { WriteDateToFirseBae } from "@/utils/firebase";
import { useStore } from "@/store";
import { Timestamp } from "firebase/firestore";

const AddNotes = () => {
  const { user } = useStore();
  const [selected, setSelected] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState<string | null>(null);

  const addNote = async () => {
    try {
      setLoading(true);
      if (!title || !content || !selected || !type) {
        alert("Please fill all fields");
      } else {
        await WriteDateToFirseBae("notes", {
          title,
          content,
          feeling: selected,
          date: Timestamp.now(),
          uid: user.uid,
          type: type,
          userEmail: user.email,
        });
        router.push("home");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper>
      <ScrollView>
        <View className="flex relative flex-1 items-center">
          <View className="absolute  left-1">
            <TouchableOpacity
              onPress={() => router.push("home")}
              className="bg-gray-200 p-2 rounded-md"
            >
              <FontAwesome name="arrow-left" size={15} />
            </TouchableOpacity>
          </View>
          <Text className="text-xl font-bold">AddNotes</Text>
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
                value={title}
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
                value={content}
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
                  selected={selected}
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
              text="Add Note"
              onPress={async () => {
                await addNote();
              }}
              isLoading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AddNotes;
