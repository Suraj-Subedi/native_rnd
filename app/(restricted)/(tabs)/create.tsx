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
// import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import {Video as ExpoVideo, ResizeMode} from "expo-av";
import usePostVideoMutation from "@/data/usePostVideoMutation";
import {useGlobalContext} from "@/context/GlobalProvider";
const Create = () => {
  const [form, setForm] = useState<{
    title: string;
    video: ImagePicker.ImagePickerAsset | null;
    thumbnail: ImagePicker.ImagePickerAsset | null;
    prompt: string;
  }>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const {mutate, isLoading, isError} = usePostVideoMutation();
  const {user} = useGlobalContext();

  const openPicker = async (type: "video" | "thumbnail") => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          type === "video"
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
        selectionLimit: 1,
      });
      if (!result.canceled) {
        console.log(result.assets[0]);
        setForm({...form, [type]: result.assets[0]});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = () => {
    try {
      if (!form.title || !form.video || !form.prompt || !form.thumbnail) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      mutate({
        title: form.title,
        video: form.video,
        thumbnail: form.thumbnail,
        prompt: form.prompt,
        userId: user?.$id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView edges={["right", "top", "left"]}>
      <ScrollView automaticallyAdjustKeyboardInsets>
        <View className=" p-4">
          <Text className="text-xl text-white font-pbold">
            {"Upload Video"}
          </Text>
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Video Title"}
            placeholder="Give your video a catchy title"
            value={form.title}
            onChangeText={(title) => setForm({...form, title})}
          />
          <TextFormField
            otherStyles={"mt-7  text-base font-pregular"}
            label={"Select Video"}
            placeholder=""
            customContent={
              form.video ? (
                <>
                  <ExpoVideo
                    source={form.video}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    className="h-40"
                  />
                  <TouchableOpacity
                    className="h-8 absolute top-6 right-2 mx-2 my-2 w-8"
                    onPress={() => openPicker("video")}
                  >
                    <Image source={icons.upload} className="w-full h-full" />
                  </TouchableOpacity>
                </>
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
                  className="border-2 border-black-100 w-full min-h-[64px] justify-center flex-row items-center bg-black-100 rounded-2xl focus:border-secondary "
                >
                  {form.thumbnail ? (
                    <Image
                      source={{uri: form.thumbnail.uri}}
                      resizeMode="cover"
                      className="h-40 w-full rounded-2xl"
                    />
                  ) : (
                    <>
                      <Image
                        source={icons.upload}
                        resizeMode="contain"
                        className="h-6 w-6"
                      />
                      <Text className="text-white text-base font-pregular">
                        {"Choose a file"}
                      </Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            }
          />
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"AI Prompt"}
            placeholder="The AI prompt of your video ..."
            value={form.prompt}
            onChangeText={(prompt) => setForm({...form, prompt})}
          />
          <CustomButton
            isLoading={isLoading}
            containerStyles="mt-7"
            title="Submit & Publish"
            onPress={submitForm}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
