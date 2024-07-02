import {Link} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, View} from "react-native";

const App = () => {
  return (
    <View className="flex flex-1 items-center justify-center">
      <Text className="text-3xl  font-pblack">{"Futura"}</Text>
      <StatusBar style="auto" />
      <Link href="/login" style={{color: "blue"}}>
        Go to Login page
      </Link>
    </View>
  );
};

export default App;
