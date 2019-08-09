import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  console.log(isLoggedIn);
  // const { logUserOut } = useContext(AuthContext);
  // const { logUserIn } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};
