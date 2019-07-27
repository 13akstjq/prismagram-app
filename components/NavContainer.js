import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../AuthContext";

export default () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { logUserOut } = useContext(AuthContext);
  const { logUserIn } = useContext(AuthContext);
  return (
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
    </View>
  );
};
