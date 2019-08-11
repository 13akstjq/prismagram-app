import React, { useState } from "react";
import styled from "styled-components";
import { TextInput, Image, Alert, ActivityIndicator } from "react-native";
import Theme from "../../Styles/Theme";
import constants from "../../constants";
import useInput from "../../Hooks/useInput";
import axios from "axios";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Home";

const UPLOAD_POST = gql`
  mutation upLoad($caption: String!, $location: String!, $files: [String!]!) {
    upLoad(caption: $caption, location: $location, files: $files) {
      id
      caption
      location
    }
  }
`;

const View = styled.View`
  align-items: flex-end;
`;
const Form = styled.View`
  flex-direction: row;
  padding: 10px;
  border-bottom-color: ${Theme.lightGreyColor};
  border-bottom-width: 1px;
`;
const InputContainer = styled.View`
  margin-left: 10px;
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  background-color: ${Theme.blueColor};
  padding: 5px 10px;
  width: ${constants.width / 3};
  margin: 10px;
`;

const Text = styled.Text`
  text-align: center;
  color: white;
`;

const Touchable = styled.TouchableOpacity``;
const UpLoad = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  // console.log(navigation.getParam("photo"));
  const captionInput = useInput("logo");
  const locationInput = useInput("green");
  const photo = navigation.getParam("photo");
  const [uploadPost] = useMutation(UPLOAD_POST, {
    refetchQueries: () => [{ query: FEED_QUERY }]
  });

  const handleSubmit = async () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("게시물 정보를 입력해주세요f.");
    } else {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", {
          name: photo.filename,
          type: "image/jpeg",
          uri: photo.uri
        });
        const {
          data: { location }
        } = await axios.post("http://192.168.56.1:4000/api/upload", formData, {
          header: {
            "content-type": "multipart/form-data"
          }
        });

        const {
          data: { upLoad }
        } = await uploadPost({
          variables: {
            caption: captionInput.value,
            location: locationInput.value,
            files: [location]
          }
        });
        if (upLoad.id) {
          navigation.navigate("TabNavigation");
        }
        console.log(upLoad);
      } catch (error) {
        Alert.alert("사진을 업로드할 수 없습니다.", "다시 시도하세요 ");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View>
      <Form>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: photo.uri }}
        />
        <InputContainer>
          <TextInput
            style={{
              height: 50,
              borderBottomColor: Theme.lightGreyColor,
              borderBottomWidth: 1
            }}
            value={captionInput.value}
            onChangeText={captionInput.onChange}
            // {...captionInput}
            placeholder="문구입력..."
          />
          <TextInput
            value={locationInput.value}
            onChangeText={locationInput.onChange}
            // {...locationInput}
            style={{ height: 50 }}
            placeholder="위치입력..."
          />
        </InputContainer>
      </Form>
      <Button onPress={handleSubmit}>
        {loading ? <ActivityIndicator color="white" /> : <Text>업로드</Text>}
      </Button>
    </View>
  );
};

export default UpLoad;
