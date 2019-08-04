import React from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity } from "react-native";
import Theme from "../Styles/Theme";
import constants from "../constants";
// Header
const Header = styled.View`
  flex: 1;
  flex-direction: row;
  margin: 10px;
`;
const AvatarContainer = styled.View`
  align-content: center;
`;
const Avatar = styled.Image`
  width: ${constants.width / 4};
  height: ${constants.width / 4};
  border-radius: ${constants.width / 8};
`;

const InfoContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const InfoContent = styled.View`
  align-items: center;
`;

const EditProfileButton = styled.Text`
  background-color: white;
  color: ${Theme.blackColor};
  padding: 5px;
  margin: 5px;
  text-align: center;
  border-radius: 6px;
  border: 1px solid ${Theme.lightGreyColor};
`;

const MenuItem = styled.View`
  flex: 1;
  align-items: center;
  width: ${constants.width / 2};
  border-bottom-width: 1px;
  border-bottom-color: ${Theme.blackColor};
`;
const MenuList = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid ${Theme.lightGreyColor};
`;

const PostList = styled.View``;

const Bold = styled.Text`
  font-weight: 600;
`;
const Text = styled.Text``;

const Touchable = styled.TouchableOpacity``;

export default ({ navigation }) => {
  const username = navigation.getParam("username");

  return (
    <ScrollView>
      <Header />
    </ScrollView>
  );
};
