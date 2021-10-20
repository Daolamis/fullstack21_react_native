import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppBar from './AppBar';
import AppBarTab from './AppBarTab';
import RepositoryList from './RepositoryList';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.appBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar>
        <AppBarTab header="Repositories" />
      </AppBar>
      <RepositoryList />
    </View>
  );
};

export default Main;
