import {View, Text, Image, FlatList} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {useGlobalContext} from "@/context/GlobalProvider";
import {icons, images} from "@/constants";
import TextFormField from "@/components/TextFormField";
import VideoCard, {Video} from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";

const posts: Video[] = [
  {
    id: 1,
    title: "Woman walks down a Tokyo...",
    thumbnail: images.thumbnail,
    prompt: "Video Prompt",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: 2,
    title: "Woman walks down a Tokyo...",
    thumbnail: images.thumbnail,
    prompt: "Video Prompt",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

const Home = () => {
  const globalContext = useGlobalContext();

  return (
    <>
      <SafeAreaView>
        {/* <ScrollView contentContainerStyle={{height: "100%"}}></ScrollView> */}
        <FlatList
          // data={posts}
          data={[] as Video[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(data) => <VideoCard key={data.index} {...data.item} />}
          ListHeaderComponent={() => (
            <View className="flex-colx p-4">
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
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title={"No videos found"}
              subtitle={"Upload new videos!"}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;

// <ScrollView contentContainerStyle={{height: "100%"}}>
//           <View className="flex-col h-full p-4">
//             <View className="justify-between flex-row">
//               <View>
//                 <Text className="font-pmedium text-gray-100 text-base">
//                   Welcome Back
//                 </Text>
//                 <Text className="text-2xl text-white font-psemibold">
//                   {globalContext?.user?.name}
//                 </Text>
//               </View>

//               <Image
//                 source={images.logoSmall}
//                 resizeMode="contain"
//                 className="h-12 w-12 mt-2"
//               />
//             </View>
//             <TextFormField
//               placeholder={"Search for a video topic"}
//               otherStyles={"mt-2"}
//               className="text-base font-pregular"
//               placeholderTextColor={"#CDCDE0"}
//               suffixIcon={<Image source={icons.search} className="w-4 h-4" />}
//             />
//             <Text className="text-gray-100 text-base font-pregular  mt-10">
//               {"Trending Videos"}
//             </Text>
//           </View>
//         </ScrollView>
