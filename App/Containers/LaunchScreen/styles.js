import { StyleSheet, Dimensions } from "react-native";
import { Metrics, ApplicationStyles } from "../../Themes/";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain"
  },
  centered: {
    alignItems: "center"
  },
  tabBarContainer: {
    width: Dimensions.get(`window`).width,
    justifyContent: `center`,
    alignItems: `center`
  }
});
