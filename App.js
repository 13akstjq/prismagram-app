import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { InMemoryCache } from "apollo-cache-inmemory"; //새로운 cache를 만들기 위함.
import { persistCache } from "apollo-cache-persist"; // 캐시 유지
import apolloClientOptions from "./apollo";
import ApolloClient from "apollo-boost"; // ApolloClient를 쉽게 setting하기 위함
import { ApolloProvider } from "react-apollo-hooks"; //react-apollo에서 react-hooks를 사용하기 위함.
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import NavContainer from "./components/NavContainer";
import { AuthProvider } from "./AuthContext";
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // true,false를 구분하기 위해 null로 초기화
  const preLoad = async () => {
    // AsyncStorage.clear();
    try {
      //load font
      await Font.loadAsync({
        ...Ionicons.font
      });

      //load asset
      await Asset.loadAsync(require("./assets/logo.png"));

      //create cache
      const cache = new InMemoryCache();

      //persist cache
      await persistCache({
        cache,
        storage: AsyncStorage
      });

      //create apolloClient
      const client = new ApolloClient({
        cache,
        request: async operation => {
          const token = await AsyncStorage.getItem("jwt");
          console.log(token);
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` }
          });
        },
        ...apolloClientOptions
      });

      //check islogin
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      console.log("isLoggedIn", isLoggedIn);
      if (isLoggedIn === null || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setClient(client);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  //component did mount
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={Theme}>
        <AuthProvider isLoggedInProp={isLoggedIn}>
          <NavContainer />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
