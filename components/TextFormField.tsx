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
  onChangeText?: (value: string) => void;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  otherStyles?: string;
  suffixIcon?: React.ReactNode;
}

const TextFormField: React.FC<TextFormFieldProps & TextInputProps> = ({
  label,
  placeholder,
  value,
  keyboardType = "default",
  otherStyles,
  secureTextEntry,
  onChangeText,
  returnKeyType,
  suffixIcon,
  ...props
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{label}</Text>
      <View className="border-2 border-black-200 w-full h-16 flex-row items-center px-4 bg-black-100 rounded-2xl focus:border-secondary-100 ">
        <TextInput
          className="flex-1 text-white font-psemibold text-sm"
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !passwordVisibility}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setPasswordVisibility(!passwordVisibility)}
          >
            <Image
              className="w-6 h-6"
              source={!passwordVisibility ? icons.eyeHide : icons.eye}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {suffixIcon && suffixIcon}
      </View>
    </View>
  );
};

export default TextFormField;
