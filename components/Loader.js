import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import Theme from "../Styles/Theme";

const Container = styled.View`
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
