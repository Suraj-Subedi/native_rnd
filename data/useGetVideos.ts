import {config, database} from "@/lib/appwrite";
import {useQuery} from "react-query";

export default function useGetVideos(search?: string) {
  return useQuery(["videos" + search], () =>
    database.listDocuments(config.databaseId, config.videoCollectionId)
  );
}
