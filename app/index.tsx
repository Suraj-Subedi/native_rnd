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
            source={images.smartLogo}
            className="w-[150px] h-[150px]"
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
        <View
          style={{
            rowGap: 16,
          }}
          className="w-full justify-center items-center  h-[80vh] px-4"
        >
          <Image
            source={images.smartLogo}
            className="w-[150px] h-[150px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-center text-white font-bold ">
              {"Track your every penny with "}
              <Text className=" text-secondary-200">{"Spend Smart"}</Text>
            </Text>
          </View>
          <Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
            {"Start your journey with us"}
          </Text>
          <CustomButton
            title="Get Started"
            onPress={() => {
              router.push("/login");
            }}
            containerStyles="w-full mt-10 absolute bottom-0"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default App;
