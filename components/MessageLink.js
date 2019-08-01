import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import { Platform } from "react-native";
import NavIcon from "./NavIcon";
const Container = styled.TouchableOpacity``;

const View = styled.View`
  margin-right: 20px;
`;

const Text = styled.Text``;

export default withNavigation(({ navigation: { navigate } }) => {
  return (
    <Container onPress={() => navigate("MessagesNavigation")}>
      <View>
        <NavIcon
          name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}
          size={36}
        />
      </View>
    </Container>
  );
});
