import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import TextFormField from "@/components/TextFormField";
import CustomButton from "@/components/CustomButton";
import {icons, images} from "@/constants";
import * as DocumentPicker from "expo-document-picker";
import {Video as ExpoVideo, ResizeMode} from "expo-av";
const Create = () => {
  const [form, setForm] = useState<{
    title: string;
    video: DocumentPicker.DocumentPickerAsset | null;
    thumbnail: DocumentPicker.DocumentPickerAsset | null;
    prompt: string;
  }>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const openPicker = async (type: "video" | "thumbnail") => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: type === "video" ? "video/mp4" || "video/*" : "image/*",

        multiple: false,
      });
      if (!result.canceled) {
        setForm({...form, [type]: result.assets[0]});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = () => {};

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
              form.video ? (
                <ExpoVideo
                  source={form.video}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  className="h-40"
                >
                  <TouchableOpacity
                    className="h-8 absolute top-2 right-2 mx-2 my-2 w-8"
                    onPress={() => openPicker("video")}
                  >
                    <Image source={icons.upload} className="w-full h-full" />
                  </TouchableOpacity>
                </ExpoVideo>
              ) : (
                <TouchableOpacity onPress={() => openPicker("video")}>
                  {
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
                </TouchableOpacity>
              )
            }
          />
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Thumbnail Image"}
            placeholder="Choose a file"
            customContent={
              <TouchableOpacity onPress={() => openPicker("thumbnail")}>
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
                  {form.thumbnail ? (
                    <Text className="text-white text-base font-pregular">
                      {"Selected: " + form.thumbnail.name}
                    </Text>
                  ) : (
                    <Text className="text-white text-base font-pregular">
                      {"Choose a file"}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
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
