import { StyleSheet } from 'react-native';
import { scale } from '../../Lib/Scaling';

export default StyleSheet.create({
  buttonWrapper: {
    height: `100%`,
    width: `100%`,
    justifyContent: `center`,
    alignItems: `center`,
    flexDirection: `row`,
  },
  button: {
    alignSelf: `stretch`,
    borderRadius: 100,
    height: scale(50),
    flex: 4,
    shadowColor: `#000000`,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  icon: { marginRight: scale(15) },
  inverseButton: {
    flex: 4,
    alignSelf: `stretch`,
    borderRadius: 100,
    height: scale(50),
    borderWidth: 1,
  },
  text: {
    height: scale(20),
    fontSize: scale(14),
    textAlign: `center`,
    alignSelf: `center`,
    lineHeight: scale(20),
  },
  subText: {
    height: scale(16),
    fontSize: scale(12),
    textAlign: `center`,
    alignSelf: `center`,
    lineHeight: scale(16),
  },
});
