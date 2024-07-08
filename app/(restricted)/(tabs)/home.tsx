import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/context/GlobalProvider";

import EmptyState from "@/components/EmptyState";
import {Video} from "@/interfaces/video";
import SearchInput from "@/components/SearchInput";

const Home = () => {
  const globalContext = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   refetch().finally(() => setRefreshing(false));
  // };

  return (
    <>
      <SafeAreaView edges={["top", "left", "right"]} className="h-full">
        <FlatList
          className="bg-primary"
          contentContainerStyle={{paddingBottom: 10}}
          data={[] as Video[]}
          keyExtractor={(item) => item.$id}
          renderItem={(data) => <></>}
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

                {/* <Image
                  source={images.}
                  resizeMode="contain"
                  className="h-12 w-12 mt-2"
                /> */}
              </View>

              <SearchInput
                placeholder={"Search for a video topic"}
                otherStyles={"mt-2"}
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
              // onRefresh={onRefresh}
              refreshing={refreshing}
            />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
