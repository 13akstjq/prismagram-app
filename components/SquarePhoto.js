import React from "react";
import { TouchableOpacity, Image } from "react-native";
import constants from "../constants";
import { withNavigation } from "react-navigation";

export default withNavigation(({ navigation, url, id }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { id: id })}>
      <Image
        source={{ uri: url }}
        style={{ height: constants.height / 6, width: constants.width / 3 }}
      />
    </TouchableOpacity>
  );
});
