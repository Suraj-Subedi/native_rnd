import {View, Text, Image, Alert} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native";
import {images} from "@/constants";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import TextFormField from "@/components/TextFormField";
import {account, createAccount} from "@/lib/appwrite";
import {ID} from "react-native-appwrite";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setIsSubmitting(true);

    const result = await createAccount(form)
      .then(() => {
        Alert.alert("Success", "Account created successfully");
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
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="font-psemibold text-2xl mt-10 text-white">
            Register to Futura
          </Text>

          <TextFormField
            label="Full Name"
            placeholder="Enter your full name"
            otherStyles="mt-10"
            keyboardType="default"
            value={form.name}
            onChangeText={(value) => setForm({...form, name: value})}
            returnKeyType="next"
          />
          <TextFormField
            label="Email Address"
            placeholder="Enter your email address"
            otherStyles="mt-5"
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
            title={"Register"}
            isLoading={isSubmitting}
          />
          <View className="justify-center mb-5">
            <Text className="text-gray-100 mt-7 text-center text-sm font-pregular">
              Already have an account?{" "}
              <Link href="/login">
                <Text className="text-secondary-200">Login</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;