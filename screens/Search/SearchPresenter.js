import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

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
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const SearchPresenter = ({ term, shouldReFetch }) => {
  const { data, loading } = useQuery(SEARCH_POST, {
    variables: {
      term
    },
    skip: !shouldReFetch
  });
  console.log(data, loading);

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
};

export default SearchPresenter;
