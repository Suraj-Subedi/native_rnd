import {config, database, storage} from "@/lib/appwrite";
import {
  AppwriteException,
  ID,
  ImageGravity,
  Models,
} from "react-native-appwrite";
import {QueryClient, useMutation} from "react-query";
import * as ImagePicker from "expo-image-picker";
import {Alert} from "react-native";
import {router} from "expo-router";
import {queryClient} from "@/app/_layout";

export interface CreateVideoType {
  title: string;
  prompt: string;
  video: ImagePicker.ImagePickerAsset;
  thumbnail: ImagePicker.ImagePickerAsset;
  userId: string;
}

const getFilePreview = (fileId: string, type: "video" | "image") => {
  try {
    let url;
    if (type === "video") {
      url = storage.getFileView(config.bucketId, fileId);
    } else {
      url = storage.getFilePreview(
        config.bucketId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    }

    if (!url) {
      throw Error("File not found");
    }

    return url;
  } catch (error) {
    throw error;
  }
};

const fileToUrl = async (
  file: ImagePicker.ImagePickerAsset,
  type: "video" | "image"
) => {
  if (!file) return;

  const asset = {
    name: file.fileName ?? "file",
    type: file.mimeType,
    uri: file.uri,
    size: file.fileSize,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.bucketId,
      ID.unique(),
      asset as any
    );

    const fileUrl = getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw error;
  }
};

export default function usePostVideoMutation() {
  return useMutation(
    async (video: CreateVideoType) => {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        fileToUrl(video.thumbnail, "image"),
        fileToUrl(video.video, "video"),
      ]).catch((e) => {
        throw e;
      });

      await database.createDocument(
        config.databaseId,
        config.videoCollectionId,
        ID.unique(),
        {
          title: video.title,
          prompt: video.prompt,
          video: videoUrl,
          thumbnail: thumbnailUrl,
          users: video.userId,
        }
      );
    },
    {
      onSuccess: () => {
        Alert.alert("Success", "Your video has been posted successfully");
        router.replace("/home");
        queryClient.invalidateQueries("videos");
      },
      onError: (error) => {
        if (error instanceof AppwriteException) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "Failed to post video");
        }
      },
    }
  );
}
