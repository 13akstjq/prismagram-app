import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { SEE_USER } from "../components/UserDetail";
import { ScrollView, RefreshControl } from "react-native";
const View = styled.View``;

const Text = styled.Text``;

const ME = gql`
  {
    me {
      user {
        username
      }
    }
  }
`;

const Profile = () => {
  const {
    data: {
      me: {
        user: { username }
      }
    }
  } = useQuery(ME);

  const { data, loading, refetch } = useQuery(SEE_USER, {
    variables: {
      username
    }
  });
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
      {!loading && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          <UserProfile {...data.seeUser.user} />
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
