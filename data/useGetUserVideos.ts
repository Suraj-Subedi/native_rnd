import {config, database} from "@/lib/appwrite";
import {Query} from "react-native-appwrite";
import {useQuery} from "react-query";

export default function useGetUserVideos(userId: any) {
  return useQuery(["userVideos" + userId], () =>
    database.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.equal("users", userId),
    ])
  );
}
