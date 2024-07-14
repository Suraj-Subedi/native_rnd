import {useGlobalContext} from "@/context/GlobalProvider";
import {config, database} from "@/lib/appwrite";
import {router} from "expo-router";
import {Alert} from "react-native";
import {AppwriteException, ID} from "react-native-appwrite";
import {useMutation, useQueryClient} from "react-query";

interface CreateTransactionProps {
  title: string;
  general_type: string;
  amount: number;
  secondary_type: string;
  is_recurring: boolean;
  resetForm: () => void;
}

export default function useAddTransaction() {
  const {user} = useGlobalContext();
  const queryClient = useQueryClient();
  return useMutation(
    async (transaction: CreateTransactionProps) => {
      await database.createDocument(
        config.databaseId,
        config.transactionCollectionId,
        ID.unique(),
        {
          ...transaction,
          users: user.$id,
          created_date: new Date().toISOString(),
        }
      );
    },
    {
      onSuccess: (_, variables) => {
        Alert.alert("Success", "Transaction added successfully");
        router.replace("/home");
        variables.resetForm();
        queryClient.invalidateQueries("recent-transactions");
      },
      onError: (error) => {
        if (error instanceof AppwriteException) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "Failed to add transaction");
        }
      },
    }
  );
}
