import React from "react";
import styled from "styled-components";

const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const View = styled.View``;

const Text = styled.Text``;

export default () => (
  <Container>
    <View>
      <Text>Messages</Text>
    </View>
  </Container>
);
