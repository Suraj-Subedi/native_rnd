import {account} from "@/lib/appwrite";
import {getCurrentUser} from "@/services";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Alert} from "react-native";

export interface UserProps {
  name: string;
  email: string;
  password: string;
}
interface GlobalContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  user: any | null;
  setUser: (value: UserProps | null) => void;
}

const GlobalContext = createContext<GlobalContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: false,
  setIsLoading: () => {},
  user: null,
  setUser: () => {},
});
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}: {children: ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data) {
          setUser(data);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoggedIn]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        setIsLoading,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
