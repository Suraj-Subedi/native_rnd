import {
  View,
  Text,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  Image,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import React, {useState} from "react";
import {TextInput} from "react-native";
import {icons} from "@/constants";

interface TextFormFieldProps {
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  otherStyles?: string;
  suffixIcon?: React.ReactNode;
  customContent?: React.ReactNode;
  error?: string;
}

const TextFormField: React.FC<TextFormFieldProps & TextInputProps> = ({
  label,
  placeholder,
  value,
  keyboardType = "default",
  otherStyles,
  secureTextEntry,
  returnKeyType,
  suffixIcon,
  customContent,
  error,
  ...props
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <View>
      <View className={`space-y-2 ${otherStyles}`}>
        <Text className="text-base text-gray-100 font-pmedium">{label}</Text>
        {customContent ? (
          customContent
        ) : (
          <View
            className={`border-2 border-black-100 w-full h-16 flex-row items-center bg-black-100 rounded-2xl focus:border-secondary ${
              error && "border-red-500 "
            }`}
          >
            <TextInput
              className="flex-1 text-white font-pregular text-base h-full  px-4"
              value={value}
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor={"#7b7b8b"}
              returnKeyType={returnKeyType}
              secureTextEntry={secureTextEntry && !passwordVisibility}
              {...props}
            />
            {secureTextEntry && (
              <TouchableOpacity
                className="mr-4"
                onPress={() => setPasswordVisibility(!passwordVisibility)}
              >
                <Image
                  className="w-6 h-6"
                  source={!passwordVisibility ? icons.eyeHide : icons.eye}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {suffixIcon && <View className="mr-4">{suffixIcon}</View>}
          </View>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1 ml-5">{error}</Text>}
    </View>
  );
};

export default TextFormField;
