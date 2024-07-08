import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Alert,
  TextInput,
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native";
import {images} from "@/constants";
import TextFormField from "@/components/TextFormField";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import {loginUser} from "@/services";
import {useGlobalContext} from "@/context/GlobalProvider";
import * as yup from "yup";
import {useFormik} from "formik";

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setIsLoggedIn} = useGlobalContext();

  const submitForm = async () => {
    setIsSubmitting(true);
    const result = await loginUser(formik.values)
      .then(() => {
        Alert.alert("Success", "User logged in successfully");
        setIsLoggedIn(true);
        router.replace("/home");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit: submitForm,
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          <Image
            source={images.smartLogo}
            resizeMode="contain"
            className="w-[115px] h-[115px]"
          />
          <Text className="font-psemibold text-2xl mt-5 text-white">
            Login to Spend Smart
          </Text>
          <TextFormField
            label="Email Address"
            placeholder="Enter your email address"
            otherStyles="mt-10"
            keyboardType="email-address"
            value={formik.values.email}
            error={formik.errors.email}
            onChangeText={(value) => formik.setFieldValue("email", value)}
            returnKeyType="next"
          />

          <TextFormField
            label="Password"
            placeholder="Enter your password"
            otherStyles="mt-5"
            secureTextEntry
            value={formik.values.password}
            error={formik.errors.password}
            onChangeText={(value) => formik.setFieldValue("password", value)}
            returnKeyType="done"
          />
          <CustomButton
            onPress={() => formik.handleSubmit()}
            containerStyles="mt-7"
            title={"Login"}
            isLoading={isSubmitting}
          />

          <View className="justify-center">
            <Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
              Don't have an account?{" "}
              <Link href="/register">
                <Text className="text-secondary-200">Sign Up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
