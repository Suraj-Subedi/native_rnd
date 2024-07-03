import {View, Text, ScrollView} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import TextFormField from "@/components/TextFormField";
import CustomButton from "@/components/CustomButton";

const Create = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className=" p-4">
          <Text className="text-xl text-white font-pbold">
            {"Upload Video"}
          </Text>
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Video Title"}
            placeholder="Give your video a catchy title"
          />
          <TextFormField
            otherStyles={"mt-7  text-base font-pregular"}
            label={"Upload Video"}
            placeholder=""
          />
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Thumbnail Image"}
            placeholder="Choose a file"
          />
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"AI Prompt"}
            placeholder="The AI prompt of your video ..."
          />
          <CustomButton
            containerStyles="mt-7"
            title="Submit & Publish"
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
