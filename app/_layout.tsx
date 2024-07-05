import React, {useEffect} from "react";
import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import GlobalProvider, {useGlobalContext} from "@/context/GlobalProvider";
import {QueryClient, QueryClientProvider} from "react-query";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const globalContext = useGlobalContext();

  console.log(globalContext?.isLoading);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded && !globalContext?.isLoading) {
      SplashScreen.hideAsync();
    }
  }, [error, fontsLoaded]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Stack>
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
            <Stack.Screen
              name="(restricted)/(tabs)"
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="(restricted)/search/[query]"
              options={{
                headerShown: true,
                headerBackTitleVisible: false,
                headerTitle: "Search Results",
                headerTitleStyle: {
                  color: "#fff",
                  fontFamily: "Poppins-Medium",
                  fontSize: 20,
                },
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#161622",
                },
              }}
            />
          </Stack>
        </GlobalProvider>
      </QueryClientProvider>
    </>
  );
};

export default RootLayout;
