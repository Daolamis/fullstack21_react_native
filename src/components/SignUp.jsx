import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { useSignIn } from '../hooks/useSignIn';
import { useSignUp } from '../hooks/useSignUp';

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
  username: yup.string().required('Username is required').min(1).max(30),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordConfirm: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Confirmed password must match with the password'
    )
    .required('Password confirm is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

export const SignUpForm = ({ onSubmit }) => {
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
          />
          <FormikTextInput
            secureTextEntry
            style={styles.input}
            name="password"
            placeholder="Password"
          />
          <FormikTextInput
            secureTextEntry
            style={styles.input}
            name="passwordConfirm"
            placeholder="Password confirmation"
          />
          <Pressable onPress={handleSubmit} style={styles.button}>
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

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  let history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
