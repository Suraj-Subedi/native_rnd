import {View, Text, TouchableOpacity} from "react-native";
import React, {FC} from "react";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPressIn={onPress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <Text className={`font-psemibold text-lg text-primary ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
