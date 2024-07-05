import {FC} from "react";
import {Text, View} from "react-native";

interface Props {
  title: string;
  value: string;
}

const StatsCard: FC<Props> = ({title, value}) => {
  return (
    <View className="items-center">
      <Text className="text-white font-psemibold text-2xl">{value}</Text>
      <Text className="text-gray-100 font-pregular text-base">{title}</Text>
    </View>
  );
};

export default StatsCard;
