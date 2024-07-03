import {View, Text, Image, ScrollView} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useGlobalContext} from "@/context/GlobalProvider";
import {icons, images} from "@/constants";
import TextFormField from "@/components/TextFormField";

const Home = () => {
  const globalContext = useGlobalContext();

  return (
    <>
      <SafeAreaView className="bg-primary">
        <ScrollView contentContainerStyle={{height: "100%"}}>
          <View className="flex-col h-full p-4">
            <View className="justify-between flex-row">
              <View>
                <Text className="font-pmedium text-gray-100 text-base">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-white font-psemibold">
                  {globalContext?.user?.name}
                </Text>
              </View>

              <Image
                source={images.logoSmall}
                resizeMode="contain"
                className="h-12 w-12 mt-2"
              />
            </View>
            <TextFormField
              placeholder={"Search for a video topic"}
              otherStyles={"mt-2"}
              className="text-base font-pregular"
              placeholderTextColor={"#CDCDE0"}
              suffixIcon={<Image source={icons.search} className="w-4 h-4" />}
            />
            <Text className="text-gray-100 text-base font-pregular  mt-10">
              {"Trending Videos"}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
};

export default Home;
