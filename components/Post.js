import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";
import { gql } from "apollo-boost";
import Comment from "./Comment";
import constants from "../constants";
import Theme from "../Styles/Theme";
import { useMutation } from "react-apollo-hooks";
import { withNavigation } from "react-navigation";
// Styled-Components

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

const HeaderInfo = styled.View``;

const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  border-radius: 20px;
`;

const Bold = styled.Text`
  font-weight: 600;
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
const CommentCount = styled.Text`
  color: ${Theme.darkGreyColor};
`;
const IconContainer = styled.View`
  padding: 6px;
  padding-left: 10px;
  flex: 1;
  flex-direction: row;
`;

const LikeCount = styled.View``;

const CommentList = styled.View``;

const Caption = styled.Text`
  margin-bottom: 5px;
`;

const Text = styled.Text``;

// Mutaion & Query
const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Post = ({
  id,
  location,
  caption,
  likeCount: likeCountProp,
  isLiked: isLikedProp,
  user,
  files,
  comments,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const commentCount = comments.length;
  const [isFold, setIsFold] = useState(true);
  const toggleFold = p => setIsFold(!p);
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id
    }
  });
  const handleLike = async () => {
    try {
      if (isLiked === false) {
        setIsLiked(true);
        setLikeCount(p => p + 1);
      } else if (isLiked === true) {
        setIsLiked(false);
        setLikeCount(p => p - 1);
      }
      await toggleLike();
    } catch (error) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <Avatar source={{ uri: user.avatar }} />
        </Touchable>
        <HeaderInfo>
          <Touchable
            onPress={() =>
              navigation.navigate("UserDetail", { username: user.username })
            }
          >
            <Bold>{user.username}</Bold>
          </Touchable>
          <Text>{location}</Text>
        </HeaderInfo>
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

      <IconContainer>
        <Touchable>
          <Ionicons
            color={isLiked ? Theme.redColor : Theme.blackColor}
            name={
              Platform.Os === "ios"
                ? isLiked
                  ? "ios-heart"
                  : "ios-heart-empty"
                : isLiked
                ? "md-heart"
                : "md-heart-empty"
            }
            onPress={handleLike}
            size={28}
          />
        </Touchable>
        <Touchable>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-chatbubbles" : "md-chatbubbles"}
            size={28}
          />
        </Touchable>
        <Touchable>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}
            size={28}
          />
        </Touchable>
      </IconContainer>
      <ContentContainer>
        <LikeCount>
          <Text>좋아요 {likeCount}개</Text>
        </LikeCount>

        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        {comments.length > 2 &&
          (isFold ? (
            <Touchable onPress={() => toggleFold(isFold)}>
              <CommentCount>댓글 {comments.length}개 모두 보기</CommentCount>
            </Touchable>
          ) : (
            <Touchable onPress={() => toggleFold(isFold)}>
              <CommentCount>댓글 접기</CommentCount>
            </Touchable>
          ))}

        {isFold ? (
          <CommentList>
            {comments.slice(0, 2).map(comment => (
              <Comment
                key={comment.id}
                text={comment.text}
                writer={comment.user.username}
              />
            ))}
          </CommentList>
        ) : (
          <CommentList>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                text={comment.text}
                writer={comment.user.username}
              />
            ))}
          </CommentList>
        )}
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

export default withNavigation(Post);
