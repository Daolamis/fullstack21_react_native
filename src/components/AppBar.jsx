import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { AUTHRORIZED_USER } from '../graphql/queries';
import { useSignOut } from '../hooks/useSignOut';

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

const SignOutTab = () => {
  const signOut = useSignOut();
  return (
    <Pressable onPress={signOut}>
      <Text style={styles.tab} fontSize="subheading" fontWeight="bold">
        Sign out
      </Text>
    </Pressable>
  );
};
const AppBar = () => {
  const { data, loading } = useQuery(AUTHRORIZED_USER);
  const authorizedUser = loading ? null : data.authorizedUser;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab header="Repositories" to="/" />
        {authorizedUser ? (
          <SignOutTab />
        ) : (
          <AppBarTab header="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
