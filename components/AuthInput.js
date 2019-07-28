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

const AuthInput = ({
  value,
  onChange,
  placeholder,
  keyboardType,
  returnKeyType = "done",
  onEndEditing = () => null
}) => {
  return (
    <InputContainer>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onEndEditing={onEndEditing}
      />
    </InputContainer>
  );
};

export default AuthInput;
