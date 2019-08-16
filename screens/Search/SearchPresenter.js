import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import SquarePhoto from "../../components/SquarePhoto";
import { ScrollView, RefreshControl } from "react-native";
import UserCard from "../../components/UserCard";
import Theme from "../../Styles/Theme";

const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      caption
      files {
        id
        url
      }
    }

    searchUser(term: $term) {
      id
      username
      fullName
      avatar
      isSelf
      isFollowing
    }
  }
`;

const PostView = styled.View`
  flex: 1;
  flex-direction: row;
`;
const UserView = styled.View`
  flex: 1;
  border-bottom-color: ${Theme.lightGreyColor};
  border-bottom-width: 1px;
  margin: 20px 0;
`;
const Text = styled.Text``;

const SearchPresenter = ({ term, shouldReFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term
    },
    skip: !shouldReFetch
  });
  console.log(data);
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <UserView>
        {!loading &&
          data &&
          data.searchUser &&
          data.searchUser.map(user => (
            <UserCard
              key={user.id}
              username={user.username}
              url={user.avatar}
              fullName={user.fullName}
              isFollowing={user.isFollowing}
              isSelf={user.isSelf}
            />
          ))}
        {/* {!loading &&
          data &&
          data.searchUser &&
          data.searchUser.length === 0 && <Text>User Not Found</Text>} */}
      </UserView>
      <PostView>
        {loading && <Loader />}
        {!loading &&
          data &&
          data.searchPost &&
          data.searchPost.map(post => (
            <SquarePhoto key={post.id} url={post.files[0].url} id={post.id} />
          ))}
        {/* {!loading &&
          data &&
          data.searchPost &&
          data.searchPost.length === 0 && <Text>Post Not Found</Text>} */}
      </PostView>
    </ScrollView>
  );
};

export default SearchPresenter;
