import {useQuery} from "react-query";
import {config, database} from "../appwrite";
import {Query} from "react-native-appwrite";
import {useGlobalContext} from "@/context/GlobalProvider";

export default function useGetRecentTransactions() {
  const {user} = useGlobalContext();

  return useQuery("recent-transactions", async () => {
    return database.listDocuments(
      config.databaseId,
      config.transactionCollectionId,
      [
        Query.equal("users", user.$id),
        Query.orderDesc("$createdAt"),
        Query.limit(5),
      ]
    );
  });
}
