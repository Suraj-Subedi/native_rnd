import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {icons, images} from "@/constants";
import {useGlobalContext} from "@/context/GlobalProvider";
import {logoutUser} from "@/lib/appwrite";
import {router} from "expo-router";
import UserAvatar from "@/components/UserAvatar";
import StatsCard from "@/components/StatsCard";

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();

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
    <SafeAreaView>
      <ScrollView>
        <View className="min-h-[85vh] p-4">
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
            <StatsCard title={"Posts"} value={"10"} />
            <StatsCard title={"Views"} value={"1.2k"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
