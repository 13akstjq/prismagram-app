import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import styled from "styled-components";
import { CREATE_ACCOUNT } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { Google } from "expo";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";
import * as Facebook from "expo-facebook";
import useInput from "../../Hooks/useInput";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const FBLogin = styled.View`
  padding-top: 10px;
  border-top-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
  border-top-width: 1px;
`;

const GGLogin = styled.View``;

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

  const facebookLogin = async () => {
    try {
      setLoading(true);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "1479242155552182",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=first_name,last_name,email,id`
        );
        const data = await response.json();
        console.log(data);
        const [username] = data.email.split("@");
        fnameInput.setValue(data.first_name);
        lnameInput.setValue(data.last_name);
        emailInput.setValue(data.email);
        usernameInput.setValue(username);
        setLoading(false);
        // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  async function googleLogin() {
    try {
      setLoading(true);
      const { type, accessToken } = await Google.logInAsync({
        androidClientId:
          "905160647828-clf0kfh3c3g2h5sthsen53vsrsqb7tkd.apps.googleusercontent.com",
        // iosClientId:
        //   "905160647828-ilo1fjlnu9ns8qo5cd0lidjd0gfohgdq.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (type === "success") {
        let userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        );
        const data = await userInfoResponse.json();
        const [username] = data.email.split("@");
        fnameInput.setValue(data.family_name);
        lnameInput.setValue(data.given_name);
        emailInput.setValue(data.email);
        usernameInput.setValue(username);
        setLoading(false);
        return accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      Alert.alert("google login fail");
      console.log(e);
      return { error: true };
    }
  }

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
        <FBLogin>
          <AuthButton
            text="Connect to FaceBook"
            onPress={facebookLogin}
            loading={loading}
            bgColor={"#3B5999"}
          />
        </FBLogin>
        <GGLogin>
          <AuthButton
            text="Connect to Google"
            onPress={googleLogin}
            loading={loading}
            bgColor={"#DC4D28"}
          />
        </GGLogin>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Signup;
