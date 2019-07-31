import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import useInput from "../../Hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Signup = ({ navigation }) => {
  const fnameInput = useInput("");
  const lnameInput = useInput("");
  const emailInput = useInput("");
  const usernameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      firstName: fnameInput.value,
      lastName: lnameInput.value,
      email: emailInput.value,
      username: usernameInput.value
    }
  });

  const handleSubmit = async () => {
    setLoading(true);
    const { value: firstname } = fnameInput;
    const { value: lastname } = lnameInput;
    const { value: email } = emailInput;
    const { value: username } = usernameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      // 이메일 유효하지 않음.
      Alert.alert("invalid email");
    } else if (firstname === "") {
      Alert.alert("write your firstname");
    } else if (lastname === "") {
      Alert.alert("write your lastname");
    } else if (username === "") {
      Alert.alert("write your username");
    } else {
      try {
        const {
          data: { createAccount }
        } = await createAccountMutation();
        if (createAccount) {
          Alert.alert("signup success", "login");
          navigation.navigate("Login", { email });
        }
      } catch (error) {
        Alert.alert("already taken", "login instead");
        navigation.navigate("Login", { email });
        console.log(error);
      }
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fnameInput}
          placeholder={"firstName"}
          returnKeyType={"done"}
        />
        <AuthInput
          {...lnameInput}
          placeholder={"lastName"}
          returnKeyType={"done"}
        />
        <AuthInput
          {...emailInput}
          placeholder={"email"}
          keyboardType={"email-address"}
          returnKeyType={"done"}
        />
        <AuthInput
          {...usernameInput}
          placeholder={"username"}
          returnKeyType={"done"}
        />
        <AuthButton text="Sign up" onPress={handleSubmit} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Signup;
