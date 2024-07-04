import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, {FC, useState} from "react";
import UserAvatar from "./UserAvatar";
import {icons, images} from "@/constants";
import {Video} from "@/interfaces/video";
import {Video as ExpoVideo, ResizeMode} from "expo-av";

const VideoCard: FC<Video> = ({id, title, thumbnail, prompt, video, users}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View className="w-full px-4 py-4 rounded-md ">
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
      {isPlaying ? (
        <ExpoVideo
          className="w-full h-[200px]  rounded-[20px] mt-3 bg-white/10"
          source={{
            uri: video,
          }}
          progressUpdateIntervalMillis={1000}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                setIsPlaying(false);
              }
            }
          }}
        >
          <ActivityIndicator className="h-full w-full" size="large" />
        </ExpoVideo>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPlaying(true)}
          className="relative mt-4 w-full items-center justify-center"
        >
          <Image
            className="w-full h-[200px] clip rounded-lg relative"
            source={{uri: thumbnail}}
            resizeMode="cover"
          />
          <Image
            className="absolute h-12 w-12x "
            source={icons.play}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
