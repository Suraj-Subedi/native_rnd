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
import {router, useLocalSearchParams, usePathname} from "expo-router";
import SearchInput from "@/components/SearchInput";

const Search = () => {
  const globalContext = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const {query} = useLocalSearchParams();

  const {isLoading, refetch, data} = useGetVideos(query as string);

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  };

  return (
    <>
      <FlatList
        className="bg-primary"
        data={data?.documents as Video[]}
        keyExtractor={(item) => item.$id}
        renderItem={(data) => <VideoCard key={data.index} {...data.item} />}
        ListHeaderComponent={() => (
          <View className="flex-col p-4">
            <SearchInput
              placeholder={"Search for a video topic"}
              className="text-base font-pregular"
              placeholderTextColor={"#CDCDE0"}
            />
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
    </>
  );
};

export default Search;
