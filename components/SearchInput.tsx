import {
  View,
  Text,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  Image,
  TouchableOpacity,
  TextInputProps,
  Alert,
} from "react-native";
import React, {useEffect, useState} from "react";
import {TextInput} from "react-native";
import {icons} from "@/constants";
import {router, useLocalSearchParams, usePathname} from "expo-router";

interface SearchInputProps {
  label?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  maxLength?: number;
  otherStyles?: string;
  suffixIcon?: React.ReactNode;
}

const SearchInput: React.FC<SearchInputProps & TextInputProps> = ({
  label,
  placeholder,
  keyboardType = "default",
  otherStyles,
  secureTextEntry,
  returnKeyType,
  suffixIcon,
  ...props
}) => {
  const params = useLocalSearchParams();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [query, setQuery] = useState((params?.query as string) ?? "");
  const path = usePathname();

  const onSearch = () => {
    if (!query && !path.startsWith("/search")) {
      return Alert.alert("Missing query", "Please enter a query");
    }
    if (path.startsWith("/search")) {
      router.setParams({query});
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{label}</Text>
      <View className="border-2 border-black-100 w-full h-16 flex-row items-center bg-black-100 rounded-2xl focus:border-secondary ">
        <TextInput
          className="flex-1 text-white font-pregular text-base h-full  px-4"
          value={query}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          returnKeyType={returnKeyType ?? "search"}
          secureTextEntry={secureTextEntry && !passwordVisibility}
          {...props}
          onChangeText={(text) => setQuery(text)}
          onSubmitEditing={onSearch}
        />
        {secureTextEntry && (
          <TouchableOpacity
            className="mr-4"
            onPress={() => setPasswordVisibility(!passwordVisibility)}
          >
            <Image
              className="w-6 h-6"
              source={!passwordVisibility ? icons.eyeHide : icons.eye}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {suffixIcon ? (
          suffixIcon
        ) : (
          <View className="mr-4">
            {
              <TouchableOpacity onPress={onSearch}>
                <Image source={icons.search} className="w-4 h-4" />
              </TouchableOpacity>
            }
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchInput;
