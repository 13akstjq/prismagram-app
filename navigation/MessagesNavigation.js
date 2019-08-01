import { createStackNavigator } from "react-navigation";
import Messages from "../screens/Message/Messages";
import Message from "../screens/Message/Message";
import { stackConfig } from "./config";

export default createStackNavigator(
  {
    Messages,
    Message
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackConfig
      }
    }
  }
);
