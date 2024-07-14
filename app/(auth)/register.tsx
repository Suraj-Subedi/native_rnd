import {View, Text, Image, Alert} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native";
import {images} from "@/constants";
import CustomButton from "@/components/CustomButton";
import {Link, router} from "expo-router";
import TextFormField from "@/components/TextFormField";
import {createAccount} from "@/services";
import * as yup from "yup";
import {useFormik} from "formik";

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

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    setIsSubmitting(true);

    const result = await createAccount(values)
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

  const {
    setFieldValue,
    values,
    errors,
    touched,
    submitForm: formikSubmitForm,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerFormSchema,
    onSubmit: submitForm,
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.smartLogo}
            resizeMode="contain"
            className="w-[115px] h-[115px]"
          />
          <Text className="font-psemibold text-2xl mt-5 text-white">
            Register to Spend Smart
          </Text>

          <TextFormField
            label="Full Name"
            placeholder="Enter your full name"
            otherStyles="mt-10"
            keyboardType="default"
            error={touched.name && errors.name}
            value={values.name}
            onChangeText={(value) => setFieldValue("name", value)}
            returnKeyType="next"
          />
          <TextFormField
            label="Email Address"
            placeholder="Enter your email address"
            otherStyles="mt-5"
            keyboardType="email-address"
            error={touched.email && errors.email}
            value={values.email}
            onChangeText={(value) => setFieldValue("email", value)}
            returnKeyType="next"
          />

          <TextFormField
            label="Password"
            placeholder="Enter your password"
            otherStyles="mt-5"
            secureTextEntry
            value={values.password}
            error={touched.password && errors.password}
            onChangeText={(value) => setFieldValue("password", value)}
            returnKeyType="done"
          />
          <CustomButton
            containerStyles="mt-7"
            onPress={() => formikSubmitForm()}
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
