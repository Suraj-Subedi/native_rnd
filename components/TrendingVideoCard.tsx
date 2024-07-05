import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import React, {FC, useState} from "react";

import {Video} from "@/interfaces/video";
import * as Animatable from "react-native-animatable";
import {icons} from "@/constants";
import {Video as ExpoVideo, ResizeMode} from "expo-av";

const TrendingVideoCard: FC<Video & {activeVideo: Video}> = ({
  $id,
  thumbnail,
  activeVideo,
  video,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> =
    {
      0: {
        transform: [{scale: 0.85}],
      },
      1: {
        transform: [{scale: 1}],
      },
    };

  const zoomOut: Animatable.CustomAnimation<
    TextStyle & ViewStyle & ImageStyle
  > = {
    0: {
      transform: [{scale: 1}],
    },
    1: {
      transform: [{scale: 0.85}],
    },
  };

  return (
    <Animatable.View
      animation={$id === activeVideo.$id ? zoomIn : zoomOut}
      className="w-[50vw] aspect-[9/14] p-2 rounded-md "
    >
      {isPlaying ? (
        <ExpoVideo
          className="w-full h-full  rounded-[20px] mt-3 bg-white/10"
          source={{
            uri: video,
          }}
          progressUpdateIntervalMillis={1000}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          useNativeControls
          volume={3}
          isMuted={false}
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
          className="relative items-center justify-center"
        >
          <Image
            className="w-full h-full clip rounded-lg relative"
            source={{uri: thumbnail}}
            resizeMode="cover"
          />
          <Image
            className="absolute h-12 w-12 "
            source={icons.play}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default TrendingVideoCard;
