import {Image, ImageSourcePropType, StyleSheet, Text, View} from "react-native";
import React, {FC, ReactNode} from "react";
import {Tabs} from "expo-router";
import {icons} from "@/constants";

interface TabIconProps {
  icon: ImageSourcePropType | undefined;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: FC<TabIconProps> = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,

            tabBarIcon: ({color, focused}) => {
              return (
                <TabIcon
                  name="Home"
                  color={color}
                  focused={focused}
                  icon={icons.home}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              return (
                <TabIcon
                  name="Create"
                  color={color}
                  focused={focused}
                  icon={icons.plus}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            headerShown: false,

            tabBarIcon: ({color, focused}) => {
              return (
                <TabIcon
                  name="Bookmark"
                  color={color}
                  focused={focused}
                  icon={icons.bookmark}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              return (
                <TabIcon
                  name="Profile"
                  color={color}
                  focused={focused}
                  icon={icons.profile}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({});