import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessagesNavigation from "./MessagesNavigation";
const MainNavigation = createStackNavigator(
  {
    TabNavigation,
    PhotoNavigation,
    MessagesNavigation
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(MainNavigation);
