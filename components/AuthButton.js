import React from "react";
import styled from "styled-components";
import constants from "../constants";
import { ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
const AuthContainer = styled.TouchableOpacity``;

const Button = styled.View`
  background-color: ${props => props.theme.blueColor};
  padding: 10px;
  width: ${constants.width / 1.7};
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
`;

const AuthButton = ({ text, onPress, loading }) => {
  return (
    <AuthContainer disabled={loading} onPress={onPress}>
      <Button>
        {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
      </Button>
    </AuthContainer>
  );
};

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default AuthButton;
