import React from "react";
import styled from "styled-components";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.Image`
  width: ${constants.width / 1.5};
  margin-bottom: 10px;
`;

const Touchable = styled.TouchableOpacity``;

const LoginButton = styled.View``;

const LoginText = styled.Text`
  color: ${props => props.theme.blueColor};
`;

const AuthHome = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Logo
        resizeMode={"contain"}
        source={require("../../assets/logo_white.png")}
      />
      <AuthButton
        text={"Create New Account"}
        onPress={() => navigate("Signup")}
      />
      <Touchable onPress={() => navigate("Login")}>
        <LoginButton>
          <LoginText>Log in</LoginText>
        </LoginButton>
      </Touchable>
    </View>
  );
};

export default AuthHome;
