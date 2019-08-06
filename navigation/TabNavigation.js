import React from "react";
import { View, Image, Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import MessageLink from "../components/MessageLink";
import Detail from "../screens/Detail";
import constants from "../constants";
import NavIcon from "../components/NavIcon";
import UserDetail from "../components/UserDetail";
import { stackConfig } from "./config";

const stackFactory = (initial, navConfig, stackNavConfig) => {
  return createStackNavigator(
    {
      initial: {
        screen: initial,
        navigationOptions: {
          ...navConfig,
          headerStyle: {
            ...stackConfig
          }
        }
      },
      Detail,
      UserDetail
    },
    {
      ...stackNavConfig
    }
  );
};

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerTitle: () => (
          <Image
            style={{ width: constants.width / 3.7 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        ),
        headerRight: <MessageLink />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, null, { headerLayoutPreset: "center" }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate("PhotoNavigation");
        },
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        headerTitle: () => (
          <Image
            style={{ width: constants.width / 3.7 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        ),
        headerRight: <MessageLink />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={
              Platform.OS === "ios"
                ? focused
                  ? "ios-heart"
                  : "ios-heart-empty"
                : focused
                ? "md-heart"
                : "md-heart-empty"
            }
          />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        headerTitle: () => (
          <Image
            style={{ width: constants.width / 3.7 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        ),
        headerRight: <MessageLink />
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        ),
        headerRight: <MessageLink />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FAFAFA"
      }
    },
    initialRouteName: "Add"
  }
);

export default TabNavigation;
