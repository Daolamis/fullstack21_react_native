import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';

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

const SignIn = () => {
  const onSubmit = (values) => console.log(values);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SigInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SigInForm = ({ onSubmit }) => {
  return (
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
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={{ color: 'white', textAlign: 'center' }} fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
