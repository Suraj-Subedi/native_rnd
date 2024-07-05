import {View, Text, ScrollView, Image} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import TextFormField from "@/components/TextFormField";
import CustomButton from "@/components/CustomButton";
import {icons} from "@/constants";

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
            customContent={
              <View className="border-2 border-black-100 w-full h-40 justify-center items-center bg-black-100 rounded-2xl focus:border-secondary ">
                <View className="border-2 border-secondary-100 border-dashed opacity-50 p-6 rounded-lg">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="h-6 w-6"
                  />
                </View>
              </View>
            }
          />
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Thumbnail Image"}
            placeholder="Choose a file"
            customContent={
              <View
                style={{
                  columnGap: 8,
                }}
                className="border-2 border-black-100 w-full h-16 justify-center flex-row items-center bg-black-100 rounded-2xl focus:border-secondary "
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="h-6 w-6"
                />
                <Text className="text-white text-base font-pregular">
                  {"Choose a file"}
                </Text>
              </View>
            }
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
