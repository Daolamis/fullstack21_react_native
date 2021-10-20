import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
});

const AppBar = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default AppBar;
