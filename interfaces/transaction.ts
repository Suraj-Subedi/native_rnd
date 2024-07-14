import {User} from "./user";
import {Models} from "react-native-appwrite";
export interface Transaction extends Models.Document {
  id: string;
  title: string;
  general_type: string;
  amount: number;
  secondary_type: string;
  is_recurring: boolean;
  created_date: string;
  deleted_at: string;
  cancelled_at: string;
  users: User;
}
