import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

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

const Photos = styled.View``;

const Content = styled.View``;

const Image = styled.Image``;

const Meta = styled.View``;

const LikeCount = styled.Text``;

const CommentList = styled.View``;

const Comment = styled.Text;

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
      <Container>
        <Header>
          <Avatar source={{ uri: `${user.avatar}` }} />
          <Bold>{user.username}</Bold>
        </Header>
      </Container>
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
