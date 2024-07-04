import {View, Text, Image} from "react-native";
import React, {FC} from "react";
import {images} from "@/constants";

interface Props {
  title: string;
  subtitle: string;
}

const EmptyState: FC<Props> = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center">
      <Image
        source={images.empty}
        resizeMode={"contain"}
        className="h-[215px] w-[270px]"
      />
      <Text className="text-white text-xl  font-psemibold">{title}</Text>
      <Text className="text-gray-100 text-sm font-pmedium">{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
