import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import TakePhoto from "../screens/Photo/TakePhoto";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import UpLoad from "../screens/Photo/UpLoad";
import { stackConfig } from "./config";
import Theme from "../Styles/Theme";
const PhotoTabs = createMaterialTopTabNavigator(
  {
    Take: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "Take"
      }
    },
    Select: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "Select"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      backgroundColor: Theme.lightGreyColor,
      activeTintColor: Theme.blackColor,
      inactiveTintColor: Theme.darkGreyColor,
      indicatorStyle: {
        backgroundColor: Theme.blackColor
      },
      labelStyle: {
        fontWeight: "600"
      },
      style: {
        marginBottom: 10,
        backgroundColor: Theme.lightGreyColor
      }
    }
  }
);

export default createStackNavigator(
  {
    PhotoTabs,
    UpLoad
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      headerStyle: {
        ...stackConfig
      }
    }
  }
);
