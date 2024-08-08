import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Button from "@/components/Button";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useStore } from "@/store";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { GithubAuthProvider, signInWithCredential } from "firebase/auth";
import { FirebaseAuth, FireBaseDb } from "@/utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createTokenWithCode } from "@/utils/createTokenWithCode";

WebBrowser.maybeCompleteAuthSession();

const Welcome = () => {
  const { setLoading } = useStore();
  const [request, response, promptAsync] = useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET,
    scopes: [],
    redirectUri: makeRedirectUri(),
  });

  async function signInWithGithub() {
    try {
      if (response?.type === "success") {
        const { code } = response.params;
        setLoading(true);
        const data = await createTokenWithCode(code);
        const { token_type, scope, access_token } = data;
        if (!access_token) {
          console.log("No access token");
          return;
        } else {
          const credential = GithubAuthProvider.credential(access_token);
          console.log({ credential });
          const res: any = await signInWithCredential(FirebaseAuth, credential);
          console.log({
            res: JSON.stringify({ res: res?.["_tokenResponse"] }),
          });
          const userDocRef = doc(FireBaseDb, "users", res.user.uid);
          const userDoc = await getDoc(userDocRef);
          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              email:
                res.user.email ||
                res?.["_tokenResponse"]?.fullName + "@gmail.com",
              userId: res.user.uid,
            });
          }
          router.replace("/(app)/home");
        }
      } else {
        console.log("No response");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    signInWithGithub();
  }, [response]);

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View
        style={{
          marginHorizontal: wp(10),
          flex: 1,
        }}
        className="flex-1 flex items-center bg-white"
      >
        <Image
          source={require("@/assets/images/pngwing.com.png")}
          style={{
            width: wp(100),
            height: hp(50),
            resizeMode: "cover",
            alignSelf: "center",
          }}
        />
        <View className="flex gap-3  mb-4">
          <Text
            style={{
              color: theme.colors.text,
              fontSize: wp(6),
            }}
            className="text-2xl font-extrabold text-center"
          >
            Welcome to your Diary
          </Text>
          <Text>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: hp(1.7),
                textAlign: "center",
                paddingHorizontal: wp(10),
              }}
            >
              Your personal diary to keep track of your thoughts, feelings and
              emotions.
            </Text>
          </Text>
        </View>
        <View>
          <Button
            text="Getting Started"
            onPress={() => router.push("signUp")}
            buttonStyle={{
              width: wp(80),
            }}
          />
          <Button
            text="Continue with GitHub"
            onPress={() => promptAsync()}
            buttonStyle={{
              marginTop: hp(2),
            }}
            iconLeft={true}
            icon={<FontAwesome name="github" size={24} color={"white"} />}
          />
          <View className="flex flex-row  items-center justify-center mt-4">
            <Text
              style={{
                color: theme.colors.text,
                fontSize: hp(2),
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
            </Text>
            <Pressable onPress={() => router.push("login")}>
              <Text
                style={{
                  color: theme.colors.primaryDark,
                  fontSize: hp(1.7),
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;
