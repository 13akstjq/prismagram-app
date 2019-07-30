import React from "react";
import styled from "styled-components";
import constants from "../constants";
import PropTypes from "prop-types";
const InputContainer = styled.View`
  padding: 5px;
`;

const Input = styled.TextInput`
  background-color: ${props => props.theme.lightGreyColor};
  width: ${constants.width / 1.7};
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
  onSubmitEditing = () => null
}) => {
  return (
    <InputContainer>
      <Input
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </InputContainer>
  );
};

AuthInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func
};

export default AuthInput;
