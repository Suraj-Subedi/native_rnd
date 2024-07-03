import {View, Text, Image, TouchableOpacity, Alert} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {icons, images} from "@/constants";
import {useGlobalContext} from "@/context/GlobalProvider";
import {logoutUser} from "@/lib/appwrite";
import {router} from "expo-router";

const Profile = () => {
  const globalContext = useGlobalContext();
  const onLogout = () => {
    logoutUser()
      .then(() => {
        globalContext?.setUser(null);
        globalContext?.setIsLoggedIn(false);
      })
      .finally(() => {
        router.push("/login");
      });
  };

  return (
    <SafeAreaView>
      <View className="items-end p-4">
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
    </SafeAreaView>
  );
};

export default Profile;
