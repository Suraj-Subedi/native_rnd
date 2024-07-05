import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {icons, images} from "@/constants";
import {useGlobalContext} from "@/context/GlobalProvider";
import {logoutUser} from "@/lib/appwrite";
import {router, useLocalSearchParams} from "expo-router";
import UserAvatar from "@/components/UserAvatar";
import StatsCard from "@/components/StatsCard";
import EmptyState from "@/components/EmptyState";
import useGetVideos from "@/data/useGetVideos";
import useGetUserVideos from "@/data/useGetUserVideos";
import {Video} from "@/interfaces";
import VideoCard from "@/components/VideoCard";

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const globalContext = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const {isLoading, refetch, data} = useGetUserVideos(user?.$id);

  const onRefresh = () => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  };
  const onLogout = () => {
    logoutUser()
      .then(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        router.push("/login");
      });
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <FlatList
        className="bg-primary h-full"
        contentContainerStyle={{paddingBottom: 20}}
        data={data?.documents as Video[]}
        keyExtractor={(item) => item.$id}
        renderItem={(data) => <VideoCard key={data.index} {...data.item} />}
        ListHeaderComponentStyle={{paddingBottom: 20}}
        ListHeaderComponent={() => (
          <>
            <View className="items-end">
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Logout", "Are you sure you want to logout?", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Logout",
                      style: "destructive",
                      isPreferred: true,
                      onPress: () => onLogout(),
                    },
                  ])
                }
              >
                <Image
                  source={icons.logout}
                  resizeMode={"contain"}
                  className="w-6 h-6"
                />
              </TouchableOpacity>
            </View>
            <View className="items-center">
              <UserAvatar source={user?.avatar} />
              <Text className="text-xl text-white mt-5 font-psemibold">
                {user?.name}
              </Text>
            </View>
            <View
              style={{
                columnGap: 40,
              }}
              className="justify-center flex flex-row mt-5"
            >
              <StatsCard
                title={"Posts"}
                value={data?.total.toString() ?? "0"}
              />
              <StatsCard title={"Views"} value={"1.2k"} />
            </View>
          </>
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
  );
};

export default Profile;
