import { Platform } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import JudgingScreen from "../Containers/JudgingScreen";

import styles from "./Styles/NavigationStyles";
import { scale } from "../Lib/Scaling";
import { Colors } from "../Themes";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Colors.vermillion,
    shadowOpacity: 0.25,
    shadowOffset: {
      height: scale(2)
    },
    shadowRadius: scale(2),
    heght: 0
  },
  headerBackTitle: ` `,
  headerTintColor: `#ffffff`,
  headerTitleStyle: {
    fontSize: scale(16),
    fontWeight: Platform.OS === `ios` ? `500` : `300`
  }
};

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    JudgingScreen: { screen: JudgingScreen }
  },
  {
    // Default config for all screens
    initialRouteName: "LaunchScreen",
    defaultNavigationOptions,
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default createAppContainer(PrimaryNav);
