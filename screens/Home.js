import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, RefreshControl } from "react-native";
import Post from "../components/Post";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
    }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Text = styled.Text``;
export default () => {
  const [refreshing, setRefreshing] = useState(false); // 당겨서 새로고침에 사용될 state
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  console.log(loading, data);
  return (
    <View>
      {loading && <Loader />}
      {!loading && (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
        >
          {data &&
            data.seeFeed &&
            data.seeFeed.map(post => <Post key={post.id} {...post} />)}
        </ScrollView>
      )}
    </View>
  );
};
