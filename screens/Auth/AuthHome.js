import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const AuthHome = ({ navigation: { navigate } }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigate("Login")}>
        <Text>sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("Signup")}>
        <Text>sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthHome;
