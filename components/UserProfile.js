import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";
import constants from "../constants";
import Theme from "../Styles/Theme";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import SquarePhoto from "./SquarePhoto";
import Post from "./Post";

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

export default ({
  id,
  username,
  firstName,
  lastName,
  avatar,
  bio,
  posts,
  postCount,
  followingCount,
  followerCount
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleIsGrid = () => setIsGrid(p => !p);
  return (
    <ScrollView>
      <Header>
        <AvatarContainer>
          <Avatar source={{ uri: avatar }} />
          <Bold>{username}</Bold>
        </AvatarContainer>
        <InfoContainer>
          <InfoContent>
            <Bold>{postCount}</Bold>
            <Text>게시물 </Text>
          </InfoContent>
          <InfoContent>
            <Bold>{followerCount}</Bold>
            <Text>팔로워 </Text>
          </InfoContent>
          <InfoContent>
            <Bold>{followingCount}</Bold>
            <Text>팔로잉 </Text>
          </InfoContent>
        </InfoContainer>
      </Header>

      <Touchable>
        <EditProfileButton>프로필 수정</EditProfileButton>
      </Touchable>

      <MenuList>
        <Touchable onPress={toggleIsGrid}>
          <MenuItem>
            <Ionicons
              color={isGrid ? Theme.blackColor : Theme.lightGreyColor}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
              size={28}
            />
          </MenuItem>
        </Touchable>
        <Touchable onPress={toggleIsGrid}>
          <MenuItem>
            <Ionicons
              color={!isGrid ? Theme.blackColor : Theme.lightGreyColor}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
              size={28}
            />
          </MenuItem>
        </Touchable>
      </MenuList>

      <PostList>
        {posts.map(post =>
          isGrid ? (
            <SquarePhoto key={post.id} id={post.id} url={post.files[0].url} />
          ) : (
            <Post key={post.id} {...post} />
          )
        )}
      </PostList>
    </ScrollView>
  );
};
