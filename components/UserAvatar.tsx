import {View, Image} from "react-native";
import React, {FC} from "react";

interface UserAvatarProps {
  source?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({source}) => {
  return (
    <View className="w-14 h-14 border-2 border-secondary-100 rounded-lg">
      <Image
        source={{uri: source}}
        className={`w-full h-full rounded-md`}
        resizeMode="cover"
      />
    </View>
  );
};

export default UserAvatar;
