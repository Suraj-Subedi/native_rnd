import {View, Text, Image, TouchableOpacity} from "react-native";
import React, {FC} from "react";
import UserAvatar from "./UserAvatar";
import {icons, images} from "@/constants";
import {Video} from "@/interfaces/video";

const VideoCard: FC<Video> = ({id, title, thumbnail, prompt, video, users}) => {
  return (
    <View className="w-full px-4 py-4 rounded-md">
      <View style={{columnGap: 16}} className="flex-row">
        <UserAvatar source={users.avatar} />
        <View className="flex-row items-center justify-between w-[77%]">
          <View style={{rowGap: 4}} className="flex-col ">
            <Text className="text-white text-base font-psemibold">{title}</Text>
            <Text className="text-gray-100 font-pregular">{users.name}</Text>
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
        className="w-full h-[200px] mt-4 clip rounded-lg"
        source={{uri: thumbnail}}
        resizeMode="cover"
      />
    </View>
  );
};

export default VideoCard;
