import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../Styles/Theme";
export default ({
  name,
  size = 24,
  color = Theme.blackColor,
  focused = false
}) => (
  <Ionicons
    name={name}
    size={size}
    color={focused ? color : Theme.darkGreyColor}
  />
);
