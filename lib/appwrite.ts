import {
  Client,
  Account,
  Avatars,
  Databases,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "np.com.subedisuraj.spendsmart",
  projectId: "668b89d0002e992412be",
  databaseId: "668b908100004da14e75",
  userCollectionId: "668b909d00127194f827",
  videoCollectionId: "6684f887002309abc1db",
  transactionCollectionId: "668b90af00362763ff62",
  bucketId: "668b90da00011499db93",
};

let client;
let account: Account;
client = new Client();
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);
account = new Account(client);

export {account, database, storage, avatars, client};
