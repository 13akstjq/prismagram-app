import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";
<<<<<<< HEAD
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
=======
>>>>>>> 989668d4b7c91950336b26c08f8cb85bd8d2b619

export default () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { logUserOut } = useContext(AuthContext);
  const { logUserIn } = useContext(AuthContext);
  return (
<<<<<<< HEAD
    <View style={{ flex: 1 }}>
      {!isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
=======
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={logUserOut}>
          <Text>i'm in~~~</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={logUserIn}>
          <Text>I'm out...</Text>
        </TouchableOpacity>
      )}
>>>>>>> 989668d4b7c91950336b26c08f8cb85bd8d2b619
    </View>
  );
};
