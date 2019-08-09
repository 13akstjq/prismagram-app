import React from "react";
import styled from "styled-components";
import { TextInput, Image, Alert } from "react-native";
import Theme from "../../Styles/Theme";
import constants from "../../constants";
import useInput from "../../Hooks/useInput";
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

const Button = styled.Text`
  background-color: ${Theme.blueColor};
  padding: 5px 10px;
  width: ${constants.width / 3};
  color: white;
  text-align: center;
  margin: 10px;
`;

const Text = styled.Text``;

const Touchable = styled.TouchableOpacity``;
const UpLoad = ({ navigation }) => {
  console.log(navigation.getParam("photo"));
  const captionInput = useInput("");
  const locationInput = useInput("");

  const handleSubmit = () => {
    if (captionInput.value === "" || locationInput.value === "") {
      Alert.alert("게시물 정보를 입력해주세요.");
    }
  };
  return (
    <View>
      <Form>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: navigation.getParam("photo").uri }}
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
      <Touchable onPress={handleSubmit}>
        <Button>업로드</Button>
      </Touchable>
    </View>
  );
};

export default UpLoad;
