import React from "react";
import { View } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import MessageLink from "../components/MessageLink";
const stackFactory = (initial, title) =>
  createStackNavigator({
    initial: {
      screen: initial,
      navigationOptions: () => ({
        headerTitle: title,
        headerRight: <MessageLink />
      })
    }
  });

const TabNavigation = createBottomTabNavigator({
  Home: stackFactory(Home, "Home"),
  Search: stackFactory(Search, "Search"),
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate("PhotoNavigation");
      }
    }
  },
  Notifications: stackFactory(Notifications, "Notifications"),
  Profile: stackFactory(Profile, "Profile")
});

export default TabNavigation;
