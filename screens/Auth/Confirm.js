import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../Hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }) => {
  // console.log(navigation.getParam("email"));
  const confirmInput = useInput("");
  const login = useLogIn(); //useLogIn의 return 으로 logUserIn이 됨.
  console.log(typeof login);
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: navigation.getParam("email"),
      secret: confirmInput.value
    }
  });
  const { value } = confirmInput;
  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (value === "" || !value.includes(" ")) {
      Alert.alert("write ConfirmSecret");
    } else {
      try {
        const {
          data: { confirmSecret }
        } = await confirmSecretMutation();
        console.log(confirmSecret);
        if (confirmSecret !== "" && confirmSecret !== false) {
          login(confirmSecret);
        } else {
          Alert.alert("Wrong Secret");
        }
      } catch (error) {
        console.log(error);
        Alert.alert("try Again");
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder={"confirm"}
          autoCapitalize={"characters"}
          returnKeyType={"send"}
          onSubmitEditing={handleSubmit}
        />
        <AuthButton text={"Confirm"} onPress={handleSubmit} loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};
