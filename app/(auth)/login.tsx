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

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setIsLoggedIn} = useGlobalContext();

  const submitForm = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsSubmitting(true);

    const result = await loginUser(form)
      .then(() => {
        setIsLoggedIn(true);
        Alert.alert("Success", "User logged in successfully");

        router.replace("/home");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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
            value={form.email}
            onChangeText={(value) => setForm({...form, email: value})}
            returnKeyType="next"
          />

          <TextFormField
            label="Password"
            placeholder="Enter your password"
            otherStyles="mt-5"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm({...form, password: value})}
            returnKeyType="done"
          />
          <CustomButton
            containerStyles="mt-7"
            onPress={submitForm}
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
