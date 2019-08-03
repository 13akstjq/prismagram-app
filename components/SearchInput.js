import React from "react";
import styled from "styled-components";
import constants from "../constants";
import Theme from "../Styles/Theme";
const TextInput = styled.TextInput`
  width: ${constants.width - 50};
  background-color: ${Theme.lightGreyColor};
  text-align: center;
`;

export default ({ value, onChange, onSubmit, placeholder }) => (
  <TextInput
    blurOnSubmit={false}
    returnKeyType="search"
    value={value}
    onChangeText={onChange}
    onSubmitEditing={onSubmit}
    placeholder={placeholder}
  />
);
