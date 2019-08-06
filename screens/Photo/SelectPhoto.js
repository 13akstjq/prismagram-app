import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity, Image, ScrollView } from "react-native";
import constants from "../../constants";
import Loader from "../../components/Loader";
const View = styled.View``;

const Text = styled.Text``;

const SelectPhoto = () => {
  const [hasAllow, setHasAllow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allPhotos, setAllPhotos] = useState();

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
      console.log(assets);
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

  // 선택된 사진 변경해주는 함수
  const changeSelected = photo => {
    setSelected(photo);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasAllow ? (
        <>
          <Image
            style={{
              width: constants.width,
              height: constants.height / 2,
              resizeMode: "contain"
            }}
            source={{ uri: selected.uri }}
          />
          <ScrollView contentContainerStyle={{ flexDirection: "row" }}>
            {allPhotos.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => changeSelected(photo)}
              >
                <Image
                  style={{
                    width: constants.width / 3,
                    height: constants.width / 3,
                    resizeMode: "contain",
                    opacity: selected === photo ? 0.4 : 1
                  }}
                  source={{ uri: photo.uri }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text>bad</Text>
      )}
    </View>
  );
};

export default SelectPhoto;
