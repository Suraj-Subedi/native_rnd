import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/context/GlobalProvider";
import {icons, images} from "@/constants";
import TextFormField from "@/components/TextFormField";
import VideoCard from "@/components/VideoCard";
import EmptyState from "@/components/EmptyState";
import {Video} from "@/interfaces/video";
import useGetVideos from "@/data/useGetVideos";
import Trending from "@/components/Trending";
import {router, usePathname} from "expo-router";
import SearchInput from "@/components/SearchInput";

const Home = () => {
  const globalContext = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const {isLoading, refetch, data} = useGetVideos();

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  };

  return (
    <>
      <SafeAreaView className="h-full">
        <FlatList
          data={data?.documents as Video[]}
          keyExtractor={(item) => item.$id}
          renderItem={(data) => <VideoCard key={data.index} {...data.item} />}
          ListHeaderComponent={() => (
            <View className="flex-col p-4">
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

              <SearchInput
                placeholder={"Search for a video topic"}
                otherStyles={"mt-2"}
                className="text-base font-pregular"
                placeholderTextColor={"#CDCDE0"}
              />
              <Text className="text-gray-100 text-base font-pregular  mt-10">
                {"Trending Videos"}
              </Text>
              <Trending videos={(data?.documents ?? []) as Video[]} />
            </View>
          )}
          ListEmptyComponent={() =>
            isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <EmptyState
                title={"No videos found"}
                subtitle={"Upload new videos!"}
              />
            )
          }
          refreshControl={
            <RefreshControl
              colors={["#fff"]}
              tintColor={"#fff"}
              onRefresh={onRefresh}
              refreshing={refreshing}
            />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
