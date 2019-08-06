import React from "react";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const UpLoad = ({ navigation }) => {
  console.log(navigation.getParam("photo"));
  return (
    <View>
      <Text />
      <Text>{navigation.getParam("photo").uri}</Text>
    </View>
  );
};

export default UpLoad;
