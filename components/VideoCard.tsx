export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
}

import {View, Text, Image, TouchableOpacity} from "react-native";
import React, {FC} from "react";
import UserAvatar from "./UserAvatar";
import {icons, images} from "@/constants";

const VideoCard: FC<Video> = ({id, title, thumbnail, prompt, video}) => {
  return (
    <View className="w-full px-4">
      <View style={{columnGap: 16}} className="flex-row">
        <UserAvatar />
        <View className="flex-row items-center justify-between w-[77%]">
          <View style={{rowGap: 4}} className="flex-col ">
            <Text className="text-white text-base font-psemibold">{title}</Text>
            <Text className="text-gray-100 font-pregular">
              {"Suraj Subedi"}
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={icons.menu}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        className="w-full h-[250px] mt-2"
        source={images.thumbnail}
        resizeMode="contain"
      />
    </View>
  );
};

export default VideoCard;
