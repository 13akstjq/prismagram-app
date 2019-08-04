import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";
import SquarePhoto from "../../components/SquarePhoto";
import { ScrollView, RefreshControl } from "react-native";

const SEARCH_POST = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      caption
      files {
        id
        url
      }
    }
  }
`;

const View = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Text = styled.Text``;

const SearchPresenter = ({ term, shouldReFetch }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, refetch } = useQuery(SEARCH_POST, {
    variables: {
      term
    },
    skip: !shouldReFetch
  });
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
      <View>
        {loading && <Loader />}
        {!loading &&
          data &&
          data.searchPost &&
          data.searchPost.map(post => (
            <SquarePhoto key={post.id} url={post.files[0].url} id={post.id} />
          ))}
      </View>
    </ScrollView>
  );
};

export default SearchPresenter;
