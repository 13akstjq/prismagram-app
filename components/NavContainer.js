import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { logUserOut } = useContext(AuthContext);
  const { logUserIn } = useContext(AuthContext);
  return (
    <View style={{ flex: 1 }}>
      {!isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};
