import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const TakePhoto = ({ navigation: { navigate } }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigate("UpLoad")}>
        <Text>TakePhoto</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TakePhoto;
