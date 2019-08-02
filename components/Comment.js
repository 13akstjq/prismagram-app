import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const Comment = styled.View`
  flex-direction: row;
`;

const Text = styled.Text`
  margin-right: 10px;
`;

const Bold = styled(Text)`
  font-weight: 600;
`;

export default ({ writer, text }) => (
  <Container>
    <Comment>
      <Bold>{writer}</Bold>
      <Text>{text}</Text>
    </Comment>
    <Ionicons
      name={Platform === "ios" ? "ios-heart-empty" : "md-heart-empty"}
    />
  </Container>
);
