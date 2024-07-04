import CustomButton from "@/components/CustomButton";
import {images} from "@/constants";
import {useGlobalContext} from "@/context/GlobalProvider";
import {Link, Redirect, router, SplashScreen} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const App = () => {
  const globalContext = useGlobalContext();

  if (!globalContext?.isLoading && globalContext?.isLoggedIn) {
    return <Redirect href={"/home"} />;
  }

  if (globalContext?.isLoading) {
    return (
      <>
        <View className="w-full h-full justify-center items-center bg-primary">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
        </View>
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-center items-center min-h[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-center text-white font-bold ">
              {"Discover Endless Possibilities with "}
              <Text className=" text-secondary-200 ">{"Futura"}</Text>
            </Text>

            <Image
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              source={images.path}
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Futura
          </Text>
          <CustomButton
            title="Continue with Email"
            onPress={() => {
              router.push("/login");
            }}
            containerStyles="w-full mt-10"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default App;
