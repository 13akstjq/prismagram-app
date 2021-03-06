import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { TouchableOpacity, Image, ScrollView } from "react-native";
import Loader from "../../components/Loader";
import constants from "../../constants";
import Theme from "../../Styles/Theme";
const View = styled.View``;

const Text = styled.Text``;

const PhotoList = styled.View`
  width: ${constants.width};
`;
const SelectBtn = styled.TouchableOpacity`
  background-color: ${Theme.lightGreyColor};
  position: absolute;
  z-index: 2;
  top: 10px;
  right: 10px;
  padding: 6px 15px;
  border-radius: 4px;
`;

const SelectPhoto = ({ navigation }) => {
  const [hasAllow, setHasAllow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allPhotos, setAllPhotos] = useState();

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      console.log(assets);
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
      // console.log(status);
      if (status === "granted") {
        setHasAllow(true);
        getPhotos();
      }
    } catch (error) {
      console.log(error);
      setHasAllow(false);
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
          <SelectBtn
            onPress={() => navigation.navigate("UpLoad", { photo: selected })}
          >
            <Text>선택</Text>
          </SelectBtn>
          <Image
            style={{
              width: constants.width,
              height: constants.height / 2
            }}
            source={{ uri: selected.uri }}
          />
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap"
              // width: constants.width
            }}
          >
            {allPhotos.map(photo => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => changeSelected(photo)}
              >
                <Image
                  style={{
                    width: constants.width / 3,
                    height: constants.width / 3,
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
