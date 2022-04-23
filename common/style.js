import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const childrenStyle = StyleSheet.create({
  children: {
    minHeight: height - 144,
    // backgroundColor: "blue",
  },

  subChild: {
    minHeight: height - 192,
    // backgroundColor: "blue",
  },
});

export const buttons = StyleSheet.create({
  primary: {
    flex: 1,
    height: 70,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});
