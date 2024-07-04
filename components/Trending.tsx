import {FlatList, View, ViewToken} from "react-native";
import React, {FC, useState} from "react";
import {Video} from "@/interfaces";
import TrendingVideoCard from "./TrendingVideoCard";

interface TrendingProps {
  videos: Video[];
}

const Trending: FC<TrendingProps> = ({videos}) => {
  const [activeItem, setActiveItem] = useState<Video>(videos[1]);

  const vieableItemsChagned = (info: {viewableItems: ViewToken<Video>[]}) => {
    if (info.viewableItems.length > 0) {
      setActiveItem(info.viewableItems[0].item);
    }
  };

  return (
    <FlatList
      className="mt-4"
      keyExtractor={(item) => item.$id}
      data={videos}
      horizontal
      renderItem={({item}) => (
        <TrendingVideoCard key={item.$id} {...item} activeVideo={activeItem} />
      )}
      showsHorizontalScrollIndicator={false}
      centerContent
      viewabilityConfig={{
        itemVisiblePercentThreshold: 85,
      }}
      onViewableItemsChanged={vieableItemsChagned}
    />
  );
};

export default Trending;
