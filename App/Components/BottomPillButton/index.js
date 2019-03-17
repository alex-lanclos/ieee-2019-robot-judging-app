import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../Themes';
import PillButton from '../PillButton';

// Styles
import styles from './styles';

const propTypes = {
  style: PropTypes.shape({}),
  enabled: PropTypes.bool,
  onPress: PropTypes.func,
  buttonColor: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const defaultProps = {
  style: {},
  enabled: undefined,
  onPress: () => {},
  buttonColor: Colors.vermillion,
  title: ``,
  subtitle: undefined,
};

class BottomPillButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      style,
      enabled,
      onPress,
      buttonColor,
      title,
      subtitle,
    } = this.props;

    return (
      <SafeAreaView style={styles.buttonWrapper}>
        <PillButton
          style={[styles.pillButton, style]}
          enabled={enabled}
          buttonColor={buttonColor}
          title={title}
          subtitle={subtitle}
          onPress={onPress}
        />
      </SafeAreaView>
    );
  }
}

BottomPillButton.propTypes = propTypes;
BottomPillButton.defaultProps = defaultProps;

export default BottomPillButton;
