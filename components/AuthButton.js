import React from "react";
import styled from "styled-components";
import constants from "../constants";

const AuthContainer = styled.TouchableOpacity``;

const Button = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  width: ${constants.width / 2};
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
`;

const AuthButton = ({ text, onPress }) => {
  console.log(onPress);
  return (
    <AuthContainer onPress={onPress}>
      <Button>
        <Text>{text}</Text>
      </Button>
    </AuthContainer>
  );
};

export default AuthButton;
