import React from "react";
// import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../Hooks/useInput";
import { Alert } from "react-native";
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const Login = () => {
  const emailValue = useInput("");
  const { value } = emailValue;
  handleSubmit = () => {
    console.log("email can't be empty");
  };
  return (
    <View>
      <AuthInput
        {...emailValue}
        placeholder={"email"}
        keyboardType={"email-address"}
        autoCapitalize={"characters"}
        returnKeyType={"send"}
        onEndEditing={handleSubmit}
      />
      <AuthButton text={"Log in"} onPress={handleSubmit} />
    </View>
  );
};

export default Login;
