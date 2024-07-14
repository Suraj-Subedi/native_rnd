import {useQuery} from "react-query";
import {config, database} from "../appwrite";
import {Query} from "react-native-appwrite";
import {useGlobalContext} from "@/context/GlobalProvider";

interface GetTransactionsProps {
  search?: string;
}

export default function useGetTransactions({search}: GetTransactionsProps) {
  const {user} = useGlobalContext();

  return useQuery(["get-transactions", search], async () => {
    const queryBuilder = [
      Query.equal("users", user.$id),
      Query.orderDesc("$createdAt"),
      Query.limit(5),
    ];

    if (search) {
      queryBuilder.push(Query.search("title", search));
    }
    return database.listDocuments(
      config.databaseId,
      config.transactionCollectionId,
      queryBuilder
    );
  });
}
