import React from "react";
import { ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragment";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../components/Loader";
import Post from "../components/Post";
import constants from "../constants";

const SEE_FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const Detail = ({ navigation }) => {
  const { data, loading } = useQuery(SEE_FULL_POST, {
    variables: {
      id: navigation.getParam("id")
    }
  });
  return (
    <ScrollView>
      {loading && <Loader />}
      {!loading && data && data.seeFullPost && <Post {...data.seeFullPost} />}
    </ScrollView>
  );
};

export default Detail;
