import React, { useState, useEffect } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { AppLoading, Font, Asset } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { InMemoryCache } from "apollo-cache-inmemory"; //새로운 cache를 만들기 위함.
import { persistCache } from "apollo-cache-persist"; // 캐시 유지
import apolloClientOptions from "./apollo";
import ApolloClient from "apollo-boost"; // ApolloClient를 쉽게 setting하기 위함
import { ApolloProvider } from "react-apollo-hooks"; //react-apollo에서 react-hooks를 사용하기 위함.

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync(require("./assets/logo.png"));
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });
      setClient(client);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded ? (
    <ApolloProvider client={client}>
      <Text>Open up App..log(); your app!</Text>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
