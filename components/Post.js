import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import Comment from "./Comment";
const Container = styled.View`
  width: ${constants.width};
  margin-bottom: 20px;
`;

const Header = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
`;

const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  border-radius: 20px;
`;

const Bold = styled.Text``;

const PhotoList = styled.View`
  height: ${constants.height / 2};
`;

const Photo = styled.Image`
  width: ${constants.width};
  height: ${constants.height / 2};
`;

const ContentContainer = styled.View`
  margin: 0 10px;
`;

const Touchable = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Content = styled.View``;

const Image = styled.Image``;

const IconContainer = styled.View`
  padding: 6px;
  padding-left: 0;
  flex: 1;
  flex-direction: row;
`;

const LikeCount = styled.Text``;

const CommentList = styled.View``;

const Text = styled.Text``;
const Post = ({
  id,
  location,
  caption,
  likeCount,
  isLiked,
  user,
  files,
  comments
}) => {
  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Bold>{user.username}</Bold>
      </Header>
      <Swiper
        style={{ height: constants.height / 2 }}
        showsButtons={false}
        showsPagination={true}
        paginationStyle={{ bottom: -20 }}
      >
        {files.map(photo => (
          <Photo key={photo.id} source={{ uri: photo.url }} />
        ))}
      </Swiper>

      <ContentContainer>
        <IconContainer>
          <Touchable>
            <Ionicons
              name={Platform === "ios" ? "ios-heart-empty" : "md-heart-empty"}
              size={28}
            />
          </Touchable>
          <Touchable>
            <Ionicons
              name={Platform === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
              size={28}
            />
          </Touchable>
          <Touchable>
            <Ionicons
              name={Platform === "ios" ? "ios-paper-plane" : "md-paper-plane"}
              size={28}
            />
          </Touchable>
        </IconContainer>
        <LikeCount>좋아요 {likeCount}개</LikeCount>
        <CommentList>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              text={comment.text}
              writer={comment.user.username}
            />
          ))}
        </CommentList>
      </ContentContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isLiked,
        username: PropTypes.string.isLiked
      })
    })
  ).isRequired
};

export default Post;
