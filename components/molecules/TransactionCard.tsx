import {View, Text} from "react-native";
import React, {FC} from "react";
import {Transaction} from "@/interfaces/transaction";
import moment from "moment";

const TransactionCard: FC<Transaction> = ({
  title,
  amount,
  secondary_type,
  is_recurring,
  users,
  general_type,
  created_date,
}) => {
  const isExpense = general_type === "expense";

  const timeAgo = moment(created_date).fromNow();
  return (
    <View className="m-4 p-2 bg-primary border-2 border-black-200 rounded-lg">
      <Text className="text-white font-psemibold">{title}</Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text
            className={`text-xs text-white font-pmedium

            }`}
          >
            {timeAgo}
          </Text>
        </View>
        <Text></Text>
        <View>
          <Text
            className={`text-lg text-white font-pmedium ${
              general_type === "expense" ? "text-red-500" : "text-green-500"
            }`}
          >
            {(isExpense ? "-" : "+") + amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionCard;
