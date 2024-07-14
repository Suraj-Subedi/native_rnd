import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useGlobalContext} from "@/context/GlobalProvider";

import EmptyState from "@/components/EmptyState";
import {Video} from "@/interfaces/video";
import SearchInput from "@/components/SearchInput";
import {Transaction} from "@/interfaces/transaction";
import useGetLatestTransactions from "@/lib/data/getLatestTransactions";
import TransactionCard from "@/components/molecules/TransactionCard";

const Home = () => {
  const globalContext = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const {data, isLoading} = useGetLatestTransactions();

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   refetch().finally(() => setRefreshing(false));
  // };

  return (
    <>
      <SafeAreaView edges={["top", "left", "right"]} className="h-full">
        <FlatList
          className="bg-primary"
          contentContainerStyle={{paddingBottom: 10}}
          data={data?.documents as Transaction[]}
          keyExtractor={(item) => item.$id}
          renderItem={(data) => <TransactionCard {...data.item} />}
          ListHeaderComponent={() => (
            <View className="flex-col p-4">
              <View className="justify-between flex-row">
                <View>
                  <Text className="font-pmedium text-gray-100 text-base">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl text-white font-psemibold">
                    {globalContext?.user?.name}
                  </Text>
                </View>
              </View>

              <SearchInput
                placeholder={"Search for your transaction"}
                otherStyles={"mt-2"}
                className="text-base font-pregular"
                placeholderTextColor={"#CDCDE0"}
              />
              <Text className="text-gray-100 text-base font-pregular  mt-10">
                {"Latest Transactions"}
              </Text>
            </View>
          )}
          ListEmptyComponent={() =>
            isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <EmptyState
                title={"No transaction found"}
                subtitle={"Add a new transaction"}
              />
            )
          }
          refreshControl={
            <RefreshControl
              colors={["#fff"]}
              tintColor={"#fff"}
              // onRefresh={onRefresh}
              refreshing={refreshing}
            />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
