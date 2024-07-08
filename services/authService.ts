import {UserProps} from "@/context/GlobalProvider";
import {account, avatars, config, database} from "@/lib/appwrite";
import {AppwriteException, ID, Models} from "react-native-appwrite";
import {MutateFunction, useMutation} from "react-query";

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
    if (!currentAccount) return null;
    const user = await database.getDocument(
      config.databaseId,
      config.userCollectionId,
      currentAccount.$id
    );

    if (!user) {
    }
    return {
      ...user,
      isVerified: currentAccount.emailVerification,
    };
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
  await account.deleteSession("current").catch((error) => {
    console.log("Error: ", error);
  });
};

//mutation function for useMutation
