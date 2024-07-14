import {View, Text, ScrollView, Alert, Switch} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import TextFormField from "@/components/TextFormField";
import CustomButton from "@/components/CustomButton";
import {RadioButton} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import * as yup from "yup";
import {useFormik} from "formik";
import {primaryTypes, secondaryExpenses, secondaryIncomes} from "@/lib/data";
import useAddTransaction from "@/services/addTransaction";

const createFormSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  primaryType: yup.string().required("Primary type is required"),
  secondaryType: yup.string().required("Secondary type is required"),
  isRecurring: yup.boolean().optional(),
  amount: yup.number().required("Amount is required"),
});

const Create = () => {
  // const {user} = useGlobalContext();

  const {mutate, isLoading} = useAddTransaction();

  const {
    values: form,
    setFieldValue,
    errors,
    submitForm,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      primaryType: "",
      secondaryType: "",
      isRecurring: false,
      amount: null as number | null,
    },
    validationSchema: createFormSchema,
    onSubmit: (values) => {
      mutate({
        amount: Number(values.amount),
        general_type: values.primaryType,
        is_recurring: values.isRecurring,
        secondary_type: values.secondaryType,
        title: values.title,
        resetForm: () => {
          resetForm();
        },
      });
    },
  });

  return (
    <SafeAreaView edges={["right", "top", "left"]}>
      <ScrollView automaticallyAdjustKeyboardInsets className="h-full">
        <View className=" p-4">
          <Text className="text-xl text-white font-pbold">
            {"Add Transaction"}
          </Text>
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Transaction Title"}
            placeholder="Give a title to remember/search for"
            value={form.title}
            error={touched.title && errors.title}
            onChangeText={(title) => setFieldValue("title", title)}
          />
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Select primary type"}
            error={touched.primaryType && errors.primaryType}
            customContent={
              <>
                <RadioButton.Group
                  onValueChange={(value) => {
                    setFieldValue("primaryType", value);
                    setFieldValue("secondaryType", "");
                  }}
                  value={form.primaryType}
                >
                  <View className="flex-row mt-3" style={{columnGap: 20}}>
                    {primaryTypes.map((type) => (
                      <View
                        key={type.value}
                        style={{
                          columnGap: 20,
                        }}
                        className="flex flex-row justify-center items-center"
                      >
                        <RadioButton.Android
                          value={type.value}
                          color="#fff"
                          uncheckedColor="#fff"
                        />
                        <Text className="text-base text-white font-pregular">
                          {type.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                </RadioButton.Group>
              </>
            }
          />
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Select secondary type"}
            error={touched.secondaryType && errors.secondaryType}
            placeholder="Give a title to remember/search for"
            onChangeText={(type) => setFieldValue("secondaryType", type)}
            customContent={
              <>
                <View
                  style={{columnGap: 20}}
                  className={`mt-3 border-2 border-black-100 w-full h-16 flex-row items-center bg-black-100 rounded-2xl focus:border-secondary
                    ${
                      touched.secondaryType &&
                      errors.secondaryType &&
                      "border-red-500"
                    }
                `}
                >
                  <RNPickerSelect
                    style={{
                      viewContainer: {
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        paddingLeft: 16,
                      },
                      placeholder: {
                        fontSize: 16,
                        fontFamily: "Poppins-Regular",
                        fontWeight: "400",
                      },
                      inputAndroid: {
                        fontSize: 16,
                        color: "#fff",
                        fontFamily: "Poppins-Regular",
                        fontWeight: "400",
                      },
                      inputIOS: {
                        fontSize: 16,
                        color: "#fff",
                        fontFamily: "Poppins-Regular",
                        fontWeight: "400",
                      },
                    }}
                    value={form.secondaryType}
                    onValueChange={(value) =>
                      setFieldValue(
                        "secondaryType",
                        value === "null" ? "" : value
                      )
                    }
                    items={
                      form.primaryType === "Income"
                        ? secondaryIncomes
                        : secondaryExpenses
                    }
                  />
                </View>
              </>
            }
          />
          <TextFormField
            otherStyles={
              "mt-7 text-base font-pregular flex-row items-center justify-between"
            }
            label={"Is Recurring every month?"}
            error={errors.isRecurring}
            customContent={
              <>
                <Switch
                  value={form.isRecurring}
                  onValueChange={(value) => {
                    setFieldValue("isRecurring", value);
                  }}
                />
              </>
            }
          />
          <TextFormField
            otherStyles={"mt-7 text-base font-pregular"}
            label={"Amount"}
            value={form.amount?.toString()}
            onChangeText={(amount) => setFieldValue("amount", amount)}
            keyboardType="number-pad"
            placeholder="Enter the transaction amount"
            error={touched.amount && errors.amount}
          />
        </View>
        <CustomButton
          disabled={isLoading}
          isLoading={isLoading}
          containerStyles="mt-10 mx-4"
          onPress={() => submitForm()}
          title={"Save Transaction"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
