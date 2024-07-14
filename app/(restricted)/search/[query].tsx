import {View, FlatList, RefreshControl, ActivityIndicator} from "react-native";
import React from "react";
import EmptyState from "@/components/EmptyState";
import {Video} from "@/interfaces/video";
import {useLocalSearchParams} from "expo-router";
import SearchInput from "@/components/SearchInput";
import useGetTransactions from "@/lib/data/getTransactions";
import {Transaction} from "@/interfaces/transaction";
import TransactionCard from "@/components/molecules/TransactionCard";

const Search = () => {
  const {query} = useLocalSearchParams();
  const {data, isLoading, refetch, isRefetching} = useGetTransactions({
    search: query as string,
  });

  return (
    <>
      <FlatList
        className="bg-primary"
        contentContainerStyle={{paddingBottom: 20}}
        data={data?.documents as Transaction[]}
        keyExtractor={(item) => item.$id}
        renderItem={(data) => <TransactionCard {...data.item} />}
        ListHeaderComponent={() => (
          <View className="flex-col p-4">
            <SearchInput
              placeholder={"Search for a transaction"}
              className="text-base font-pregular"
              placeholderTextColor={"#CDCDE0"}
            />
          </View>
        )}
        ListEmptyComponent={() =>
          isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <EmptyState
              title={"No transaction found"}
              subtitle={"Add new transaction!"}
            />
          )
        }
        refreshControl={
          <RefreshControl
            colors={["#fff"]}
            tintColor={"#fff"}
            onRefresh={() => refetch()}
            refreshing={isRefetching}
          />
        }
      />
    </>
  );
};

export default Search;
