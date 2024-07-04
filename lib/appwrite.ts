import {UserProps} from "@/context/GlobalProvider";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Models,
  AppwriteException,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "np.com.subedisuraj.futura",
  projectId: "6684ee4f000e58b1ccde",
  databaseId: "6684f876000a920d1a49",
  userCollectionId: "6684f89900088ef82ef4",
  videoCollectionId: "6684f887002309abc1db",
  bucketId: "6684f9eb003c2152f40f",
};

let client;
let account: Account;
client = new Client();
const avatars = new Avatars(client);
const database = new Databases(client);

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);
account = new Account(client);

export const createUserDocument = async (
  user: Models.User<Models.Preferences>
) => {
  const avatarUrl = avatars.getInitials(user.name);
  const newUser = await database.createDocument(
    config.databaseId,
    config.userCollectionId,
    user.$id,
    {
      accountId: user.$id,
      email: user.email,
      name: user.name,
      avatar: avatarUrl,
    }
  );
  return newUser;
};

export const createAccount = async (user: UserProps) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    return await createUserDocument(newAccount);
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (user: Omit<UserProps, "name">) => {
  // const currentSession = await account.listSessions();
  // console.log(currentSession);
  // if (currentSession.total > 1) {
  //   await logoutUser();
  // }
  await account
    .createEmailPasswordSession(user.email, user.password)
    .catch((error) => {
      throw error;
    });
};

export const getCurrentUser = async () => {
  const currentAccount = await account.get().catch((error) => {
    console.log("Error: ", error);
    return null;
  });
  try {
    if (!currentAccount) throw Error;
    const user = await database.getDocument(
      config.databaseId,
      config.userCollectionId,
      currentAccount.$id
    );

    if (!user) {
    }
    return user;
  } catch (error) {
    if (
      error instanceof AppwriteException &&
      error.type === "document_not_found" &&
      currentAccount
    ) {
      return createUserDocument(currentAccount);
    } else {
      console.log("Error: ", error);
      console.log(error);
    }
  }
};

//logout
export const logoutUser = async () => {
  await account.deleteSessions().catch((error) => {
    console.log("Error: ", error);
  });
};

export {account, database};
