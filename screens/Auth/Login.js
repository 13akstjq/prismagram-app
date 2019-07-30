import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../Hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }) => {
  const emailValue = useInput(navigation.getParam("email", ""));
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: emailValue.value
    }
  });
  const { value } = emailValue;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleSubmit = async () => {
    console.log("login");
    if (value === "") {
      Alert.alert("email can't be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      Alert.alert("please write an email ");
    } else if (!emailRegex.test(value)) {
      Alert.alert("that email is invalid ");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if (requestSecret) {
        console.log("인증키 전송 성공");
        Alert.alert("Check your email");
        navigation.navigate("Confirm", { email: value });
      } else {
        console.log("인증키 전송 실패");
        Alert.alert("signUp");
        navigation.navigate("Signup");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailValue}
          placeholder={"email"}
          keyboardType={"email-address"}
          autoCapitalize={"characters"}
          returnKeyType={"send"}
          onSubmitEditing={handleSubmit}
        />
        <AuthButton text={"Log in"} onPress={handleSubmit} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
