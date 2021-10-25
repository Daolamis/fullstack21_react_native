import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  tab: { color: 'white', padding: 15 },
});

const AppBarTab = ({ header, to }) => {
  return (
    <Pressable>
      <Link to={to}>
        <Text style={styles.tab} fontSize="subheading" fontWeight="bold">
          {header}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab header="Repositories" to="/" />
        <AppBarTab header="Sign in" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
