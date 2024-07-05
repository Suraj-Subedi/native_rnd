import {User} from "./user";
import {Models} from "react-native-appwrite";
export interface Video extends Models.Document {
  id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  users: User;
}
