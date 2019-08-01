import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import TakePhoto from "../screens/Photo/TakePhoto";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import UpLoad from "../screens/Photo/UpLoad";
import { stackConfig } from "./config";
const PhotoTabs = createMaterialTopTabNavigator(
  {
    TakePhoto,
    SelectPhoto
  },
  {
    tabBarPosition: "bottom"
  }
);

export default createStackNavigator(
  {
    PhotoTabs,
    UpLoad
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackConfig
      }
    }
  }
);
