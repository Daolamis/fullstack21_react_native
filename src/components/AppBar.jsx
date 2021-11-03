import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useSignOut } from '../hooks/useSignOut';
import { useHistory } from 'react-router';
import Text from './Text';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import theme from '../theme';

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
  const history = useHistory();
  const signOut = useSignOut();

  const handleSignout = () => {
    signOut();
    history.push('/');
  };
  return (
    <Pressable onPress={handleSignout}>
      <Text style={styles.tab} fontSize="subheading" fontWeight="bold">
        Sign out
      </Text>
    </Pressable>
  );
};
const AppBar = () => {
  const { authorizedUser } = useAuthorizedUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab header="Repositories" to="/" />
        {authorizedUser ? (
          <>
            <AppBarTab header="Create a review" to="/review" />
            <AppBarTab header="My reviews" to="/myreviews" />
            <SignOutTab />
          </>
        ) : (
          <>
            <AppBarTab header="Sign in" to="/signin" />
            <AppBarTab header="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
