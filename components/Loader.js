import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import Theme from "../Styles/Theme";
import constants from "../constants";

const Container = styled.View`
  width: ${constants.width};
  height: ${constants.height};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => {
  return (
    <Container>
      <ActivityIndicator color={Theme.darkGreyColor} />
    </Container>
  );
};
