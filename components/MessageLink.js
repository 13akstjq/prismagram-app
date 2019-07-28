import React from "react";
import styled from "styled-components";
import { withNavigation } from "react-navigation";

const Container = styled.TouchableOpacity``;

const View = styled.View``;

const Text = styled.Text``;

export default withNavigation(({ navigation: { navigate } }) => {
  return (
    <Container onPress={() => navigate("MessagesNavigation")}>
      <View>
        <Text>Messages</Text>
      </View>
    </Container>
  );
});
