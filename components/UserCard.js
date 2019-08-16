import React from "react";
import styled from "styled-components";
import Theme from "../Styles/Theme";
import constants from "../constants";

const Wrapper = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  width: ${constants.width};
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const Text = styled.Text``;

const ButtonText = styled.Text`
  color: white;
`;

const FollowButton = styled.TouchableOpacity`
  right: 10px;
  position: absolute;
  align-self: center;
  color: white;
  padding: 5px 10px;
  background-color: ${Theme.blueColor};
  border-radius: 4px;
`;

const Touchable = styled.TouchableOpacity``;

const Username = styled.View`
  flex-direction: row;
`;
export default ({ url, username, isFollowing, fullName, isSelf }) => {
  return (
    <Wrapper>
      <Avatar source={{ uri: url }} />
      <Touchable>
        <Username>
          <Text>{username}</Text>
          {isFollowing && <Text>- 팔로잉</Text>}
        </Username>
        <Text>{fullName}</Text>
      </Touchable>
      {!isFollowing && !isSelf && (
        <FollowButton>
          <ButtonText>팔로우</ButtonText>
        </FollowButton>
      )}
    </Wrapper>
  );
};
