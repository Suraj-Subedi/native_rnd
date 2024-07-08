import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {icons} from "@/constants";
import {useGlobalContext} from "@/context/GlobalProvider";
import {logoutUser} from "@/services";
import {router} from "expo-router";
import UserAvatar from "@/components/UserAvatar";
import StatsCard from "@/components/StatsCard";
import EmptyState from "@/components/EmptyState";
import {Video} from "@/interfaces";
import Spinner from "react-native-loading-spinner-overlay";

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const globalContext = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onRefresh = () => {
    // setRefreshing(true);
    // refetch().finally(() => setRefreshing(false));
  };
  const onLogout = () => {
    setIsLoggingOut(true);
    logoutUser()
      .then(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoggingOut(false);
        router.replace("/login");
      });
  };

  return (
    <>
      <Spinner
        visible={isLoggingOut}
        textContent={"Logging out..."}
        textStyle={{color: "#fff"}}
        overlayColor="rgba(16, 22, 26, 0.9)"
        color="white"
      />
      <SafeAreaView edges={["top", "left", "right"]}>
        <FlatList
          className="bg-primary h-full"
          contentContainerStyle={{paddingBottom: 20}}
          data={[] as Video[]}
          keyExtractor={(item) => item.$id}
          renderItem={(data) => <></>}
          ListHeaderComponentStyle={{paddingBottom: 20}}
          ListHeaderComponent={() => (
            <>
              <View className="items-end mr-5 mt-5">
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
                <StatsCard title={"Posts"} value={"0"} />
                <StatsCard title={"Views"} value={"1.2k"} />
              </View>
            </>
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
      </SafeAreaView>
    </>
  );
};

export default Profile;
