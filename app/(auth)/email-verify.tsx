import {View, Text, Image, Alert, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native";
import {images} from "@/constants";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import TextFormField from "@/components/TextFormField";
import {createAccount, logoutUser} from "@/services";
import * as yup from "yup";
import {useFormik} from "formik";
import {useGlobalContext} from "@/context/GlobalProvider";
import Spinner from "react-native-loading-spinner-overlay";

const registerFormSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const EmailVerify = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const globalContext = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const submitForm = async () => {
    setIsSubmitting(true);
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

  const sendVerificationEmail = async () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <Spinner
        visible={isLoggingOut}
        textContent={"Logging out..."}
        textStyle={{color: "#fff"}}
        overlayColor="rgba(16, 22, 26, 0.9)"
        color="white"
      />
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.smartLogo}
            resizeMode="contain"
            className="w-[150px] h-[150px]"
          />
          <Text className="font-psemibold text-xl mt-5 text-white text-center">
            Verify Email to continue
          </Text>
          <Text className="font-pregular text-base mt-5 text-white">
            {"We have sent email to your account. \n "}
            <Text className="">
              {
                "If you have already verified your account, continue to home ..."
              }
            </Text>
          </Text>

          <CustomButton
            containerStyles="mt-7 w-full"
            onPress={() => {}}
            title={"Continue to Home"}
            isLoading={isSubmitting}
          />

          <CustomButton
            containerStyles="mt-7 w-full bg-primary border border-secondary-200"
            onPress={sendVerificationEmail}
            title={"Send Verification Email"}
            // isLoading={isSubmitting}
          />
          <View className="justify-center mb-5">
            <Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
              Login with different account?{" "}
              <TouchableOpacity onPress={() => onLogout()}>
                <Text className="text-secondary-200">Go Back</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmailVerify;
