import {config, database} from "@/lib/appwrite";
import {Query} from "react-native-appwrite";
import {useQuery} from "react-query";

export default function useGetLatestVideos(search?: string) {
  return useQuery(["latestVideos" + search], () =>
    database.listDocuments(config.databaseId, config.videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ])
  );
}
