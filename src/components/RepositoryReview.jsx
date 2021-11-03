import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { useCreateReview } from '../hooks/useCreateReview';

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
  ownerName: yup.string().required('Repository owner is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .integer()
    .required('Repository rating is required'),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

export const RepositoryReviewForm = ({ onSubmit }) => {
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
            name="ownerName"
            placeholder="Repository owner name"
          />
          <FormikTextInput
            style={styles.input}
            name="repositoryName"
            placeholder="Repository name"
          />
          <FormikTextInput
            style={styles.input}
            name="rating"
            placeholder="Rating between 0 - 100"
          />
          <FormikTextInput
            style={styles.input}
            name="text"
            placeholder="Review"
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
              Create a review
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const RepositoryReview = () => {
  const history = useHistory();
  const [createReview] = useCreateReview();
  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        ...values,
        rating: parseInt(values.rating, 10),
      });
      const repoId = data.createReview.repository.id;
      history.push(`/repository/${repoId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <RepositoryReviewForm onSubmit={onSubmit} />;
};

export default RepositoryReview;
