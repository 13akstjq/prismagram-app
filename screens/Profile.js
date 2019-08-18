import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { SEE_USER } from "../components/UserDetail";
import { ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { POST_FRAGMENT } from "../fragment";
const View = styled.View``;

const Text = styled.Text``;

const ME = gql`
  {
    me {
      user {
        id
        avatar
        username
        fullName
        posts {
          ...PostParts
        }
        postCount
        followingCount
        followerCount
      }
    }
  }
  ${POST_FRAGMENT}
`;

const Profile = () => {
  const { data, loading } = useQuery(ME);
  // const { data, loading, refetch } = useQuery(SEE_USER, {
  //   variables: {
  //     username
  //   }
  // });
  console.log(data);
  const [refreshing, setRefreshing] = useState(false);
  const refresh = () => {
    try {
      setRefreshing(true);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <View>
      {loading && <Loader />}
      {!loading && data && data.me && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          <UserProfile {...data.me.user} />
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
