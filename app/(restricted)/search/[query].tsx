import {View, FlatList, RefreshControl, ActivityIndicator} from "react-native";
import React, {useState} from "react";
import {useGlobalContext} from "@/context/GlobalProvider";
import EmptyState from "@/components/EmptyState";
import {Video} from "@/interfaces/video";
import {useLocalSearchParams} from "expo-router";
import SearchInput from "@/components/SearchInput";

const Search = () => {
  const globalContext = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const {query} = useLocalSearchParams();

  const onRefresh = () => {
    // setRefreshing(true);
    // refetch().finally(() => setRefreshing(false));
  };

  return (
    <>
      <FlatList
        className="bg-primary"
        contentContainerStyle={{paddingBottom: 20}}
        data={[] as Video[]}
        keyExtractor={(item) => item.$id}
        renderItem={(data) => <></>}
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
          false ? (
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
