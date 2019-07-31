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

const stackFactory = initial => {
  return createStackNavigator({
    initial: {
      screen: initial,
      navigationOptions: {
        headerTitle: (
          <Image
            style={{ width: constants.width / 3.7 }}
            resizeMode="contain"
            source={require("../assets/logo.png")}
          />
        ),
        headerRight: <MessageLink />
      }
    }
  });
};

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate("PhotoNavigation");
        },
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-add" : "md-add"} />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-heart" : "md-heart"} />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile),
      navigationOptions: {
        tabBarIcon: (
          <NavIcon name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default TabNavigation;
