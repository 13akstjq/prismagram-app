import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../Hooks/useInput";
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Login = () => {
  const Input = useInput("");
  return (
    <View>
      <AuthInput
        {...Input}
        placeholder={"email"}
        keyboardType={"email-address"}
        autoCapitalize={"characters"}
      />
      <AuthButton text={"Log in"} onPress={() => console.log("login")} />
    </View>
  );
};

export default Login;
