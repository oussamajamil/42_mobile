import { View, TextInput, TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import TabsIcon from "../../components/TabsIcon";
import { Calendar, CalendarDays, MapPin, Search, Settings } from "lucide-react-native";
import { useStore } from "../../store";
import * as Location from "expo-location";

const _layout = () => {
  const { search, setSearch } = useStore();
  const [stateSearch, setStateSearch] = React.useState("");
  const [location,setLocation] = useState("");
  
  const getPermission = async()=>{
    let res =  await Location.getCurrentPositionAsync();
    console.log({res});
  }
  useEffect(()=>{
    getPermission();
  },[])
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#A3D8FF",
            borderTopWidth: 1,
            borderTopColor: "#A3D8FF",
            height: 60,
          },
          header: () => (
            <SafeAreaView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 8,
                  backgroundColor: "#A3D8FF",
                }}
              >
                <View
                  style={{
                    width: "80%",
                    display:"flex",
                    flexDirection:"row",
                    gap:8,
                    alignItems: "center",
                  }}
                >
                  <Search color="white" size={20} />
                  <TextInput
                    value={stateSearch}
                    onChangeText={(text:string) => setStateSearch(text)}
                    style={{
                      padding: 8,
                      backgroundColor: "transparent",
                      borderRadius: 10,
                    }}
                    placeholder="Search...."
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSearch(stateSearch.trim());
                  }}
                  style={{
                    backgroundColor: "#FFA001",
                    padding: 6,
                    borderRadius: 100,
                  }}
                >
                  <MapPin color="white" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          ),
        }}
      >
           <Tabs.Screen
          name="currently"
          options={{
            tabBarIcon: ({ color, focused }:{
              color:string,
              focused:boolean
            }) => (
              <TabsIcon
                name="currently"
                icon={<Calendar color={color} />}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="today"
          options={{
            tabBarIcon: ({ color, focused }:{
              color:string,
              focused:boolean
            }) => (
              <TabsIcon
                name="today"
                icon={<Settings color={color} />}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
     
        <Tabs.Screen
          name="weekly"
          options={{
            tabBarIcon: ({ color, focused }:{
              color:string,
              focused:boolean
            }) => (
              <TabsIcon
                name="weekly"
                icon={<CalendarDays color={color} />}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" backgroundColor="#A3D8FF" />
    </>
  );
};

export default _layout;
