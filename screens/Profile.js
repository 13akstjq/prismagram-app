import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";

const View = styled.View``;

const Text = styled.Text``;

const ME = gql`
  {
    me {
      user {
        id
        username
        firstName
        lastName
        avatar
        bio
        posts {
          id
          files {
            id
            url
          }
        }
        postCount
        followingCount
        followerCount
      }
    }
  }
`;

const Profile = () => {
  const { data, loading } = useQuery(ME);
  return (
    <View>
      {loading && <Loader />}
      {!loading && <UserProfile {...data.me.user} />}
    </View>
  );
};

export default Profile;
