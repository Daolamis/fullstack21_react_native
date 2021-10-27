import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { useSignIn } from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderColor: theme.colors.appBackground,
    borderWidth: 1,
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    marginBottom: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

export const SignInForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            style={styles.input}
            name="username"
            placeholder="Username"
            testID="usernameField"
          />
          <FormikTextInput
            secureTextEntry
            style={styles.input}
            name="password"
            placeholder="Password"
            testID="passwordField"
          />
          <Pressable
            onPress={handleSubmit}
            style={styles.button}
            testID="submitButton"
          >
            <Text
              style={{ color: 'white', textAlign: 'center' }}
              fontWeight="bold"
            >
              Sign in
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
