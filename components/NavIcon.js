import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Theme from "../Styles/Theme";
export default ({ name, size = 24, color = Theme.blackColor }) => (
  <Ionicons name={name} size={size} color={color} />
);
