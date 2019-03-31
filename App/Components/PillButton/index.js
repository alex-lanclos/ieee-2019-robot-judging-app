import React from "react";
import { View, TouchableHighlight, Text } from "react-native";
import PropTypes from "prop-types";
import tinycolor from "tinycolor2";
import styles from "./styles";
import { Colors } from "../../Themes";

const propTypes = {
  style: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  onPress: PropTypes.func,
  title: PropTypes.string,
  inverse: PropTypes.bool,
  subtitle: PropTypes.string,
  textColor: PropTypes.string,
  buttonColor: PropTypes.string,
  enabled: PropTypes.bool,
  icon: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number
  })
};

const defaultProps = {
  style: {},
  onPress: () => {},
  title: ``,
  subtitle: null,
  inverse: false,
  buttonColor: Colors.vermillion,
  textColor: Colors.snow,
  enabled: true
};

class PillButton extends React.PureComponent {
  renderSubtitle(textColor) {
    const { subtitle } = this.props;

    if (subtitle) {
      return (
        <Text
          style={[
            styles.subText,
            {
              color: textColor
            }
          ]}>
          {subtitle}
        </Text>
      );
    }
  }

  render() {
    const {
      style,
      title,
      subtitle,
      enabled,
      onPress,
      inverse,
      buttonColor
    } = this.props;

    let { textColor } = this.props;
    let backgroundColor, backgroundStyle, buttonStyle;

    if (inverse) {
      backgroundStyle = styles.inverseButton;
      textColor = buttonColor;
      backgroundColor = `white`;
    } else {
      backgroundStyle = styles.button;
      backgroundColor = buttonColor;
    }

    backgroundColor = enabled ? backgroundColor : Colors.disabledGrey;

    let underlayColor = enabled
      ? tinycolor(backgroundColor)
          .darken(10)
          .toString()
      : backgroundColor;

    if (subtitle) {
      buttonStyle = [
        backgroundStyle,
        {
          backgroundColor,
          borderColor: buttonColor
        },
        style
      ];
    } else {
      buttonStyle = [
        backgroundStyle,
        {
          backgroundColor,
          borderColor: buttonColor
        },
        style
      ];
    }

    return (
      <TouchableHighlight
        style={buttonStyle}
        underlayColor={underlayColor}
        onPress={onPress}>
        <View style={styles.buttonWrapper}>
          <View>
            <Text
              style={[
                styles.text,
                {
                  color: textColor
                }
              ]}>
              {title}
            </Text>
            {this.renderSubtitle(textColor)}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

PillButton.propTypes = propTypes;
PillButton.defaultProps = defaultProps;

export default PillButton;
