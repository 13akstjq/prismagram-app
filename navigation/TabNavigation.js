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
import constants from "../constants";
import NavIcon from "../components/NavIcon";
import { stackConfig } from "./config";

const stackFactory = initial => {
  return createStackNavigator({
    initial: {
      screen: initial,
      navigationOptions: {
        headerTitle: () => (
          <Image
            style={{ width: constants.width / 3.7 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        ),
        headerRight: <MessageLink />,
        headerStyle: {
          ...stackConfig
        }
      }
    }
  });
};

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home),
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
      screen: stackFactory(Search),
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
      screen: stackFactory(Notifications),
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
      screen: stackFactory(Profile),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: "#FAFAFA"
      }
    }
  }
);

export default TabNavigation;
