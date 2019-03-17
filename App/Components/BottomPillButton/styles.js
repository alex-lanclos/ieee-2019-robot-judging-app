import { StyleSheet } from 'react-native';
import { scale } from '../../Lib/Scaling';

export default StyleSheet.create({
  buttonWrapper: {
    position: `absolute`,
    alignItems: `center`,
    bottom: scale(20),
    left: 0,
    right: 0,
  },
  pillButton: {
    marginHorizontal: scale(35),
  },
});
