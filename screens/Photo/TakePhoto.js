import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import Loader from "../../components/Loader";
import constants from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "@unimodules/core";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const TakePhoto = ({ navigation: { navigate } }) => {
  const [hasAllow, setHasAllow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type);
  //카메라 권한 요청 함수
  const requestPermission = async () => {
    try {
      setLoading(true);
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasAllow(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCameraType = () => {};

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasAllow ? (
        <Camera
          style={{ width: constants.width, height: constants.height / 1.5 }}
        >
          <TouchableOpacity>
            <Ionicons
              name={
                Platform.OS === "ios"
                  ? "ios-reverse-camera"
                  : "md-reverse-camera"
              }
              color="white"
              size={28}
              style={{}}
            />
          </TouchableOpacity>
        </Camera>
      ) : null}
    </View>
  );
};

export default TakePhoto;
