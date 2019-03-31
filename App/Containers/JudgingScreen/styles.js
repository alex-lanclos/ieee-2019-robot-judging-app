import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles } from "../../Themes/";
import { scale } from "../../Lib/Scaling";

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
  textLabel: {
    fontSize: scale(16),
    fontWeight: "300"
  },
  textValue: {
    fontSize: scale(18),
    fontWeight: "500"
  }
});
