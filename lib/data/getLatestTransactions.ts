import {useQuery} from "react-query";
import {config, database} from "../appwrite";
import {Query} from "react-native-appwrite";

export default function useGetLatestTransactions() {
  return useQuery("latest-transactions", async () => {
    return database.listDocuments(
      config.databaseId,
      config.transactionCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );
  });
}
