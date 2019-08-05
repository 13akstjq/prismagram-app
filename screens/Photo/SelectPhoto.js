import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity, Image } from "react-native";
import Loader from "../../components/Loader";
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const SelectPhoto = () => {
  const [hasAllow, setHasAllow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allPhotos, setAllPhotos] = useState([]);

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //접근 권한 요청 함수
  const requestPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setHasAllow(true);
        getPhotos();
      }
    } catch (error) {
      console.log(error);
      setHasAllow(false);
    } finally {
      //여기에서 loading false하면 안됨.
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasAllow ? (
        <TouchableOpacity>
          {console.log(selected)}
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: selected.uri }}
          />
        </TouchableOpacity>
      ) : (
        <Text>bad</Text>
      )}
    </View>
  );
};

export default SelectPhoto;
