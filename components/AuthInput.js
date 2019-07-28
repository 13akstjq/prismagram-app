import React from "react";
import styled from "styled-components";
import constants from "../constants";
const InputContainer = styled.View`
  padding: 10px;
`;

const Input = styled.TextInput`
  background-color: ${props => props.theme.lightGreyColor};
  width: ${constants.width / 2};
  padding: 5px;
  text-align: center;
  border-radius: 4px;
`;

const AuthInput = ({ placeholder, keyboardType }) => {
  return (
    <InputContainer>
      <Input placeholder={placeholder} keyboardType={keyboardType} />
    </InputContainer>
  );
};

export default AuthInput;
