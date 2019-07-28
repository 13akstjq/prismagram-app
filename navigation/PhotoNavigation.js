import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import TakePhoto from "../screens/Photo/TakePhoto";
import SelectPhoto from "../screens/Photo/SelectPhoto";
// import Upload from "../screens/Photo/Upload";
const PhotoTabs = createMaterialTopTabNavigator(
  {
    TakePhoto,
    SelectPhoto
  },
  {
    tabBarPosition: "bottom"
  }
);

export default createStackNavigator({
  PhotoTabs
  //   Upload
});
