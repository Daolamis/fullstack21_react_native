import React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useHistory } from 'react-router';
import { useDeleteReview } from '../hooks/useDeleteReview';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: theme.colors.primary,
    borderWidth: 3,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    marginBottom: 10,
  },
  filler: {
    width: 20,
  },
});

const Buttons = ({ repoId, reviewId }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  const deleteAlert = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
        },
        { text: 'DELETE', onPress: () => deleteReview(reviewId) },
      ]
    );

  const handleViewRepository = () => {
    history.push(`/repository/${repoId}`);
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={handleViewRepository}>
        <Text style={{ color: 'white', textAlign: 'center' }} fontWeight="bold">
          View repository
        </Text>
      </Pressable>
      <View style={styles.filler} />
      <Pressable
        style={[styles.button, { backgroundColor: '#bb3333' }]}
        onPress={deleteAlert}
      >
        <Text style={{ color: 'white', textAlign: 'center' }} fontWeight="bold">
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};

const ReviewItem = ({ review, myReviews }) => {
  const reviewTitle = myReviews
    ? review.repository.fullName
    : review.user.username;

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text
            style={{ color: theme.colors.primary }}
            fontWeight="bold"
            fontSize="subheading"
          >
            {review.rating}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text} fontWeight="bold">
            {reviewTitle}
          </Text>
          <Text style={styles.text} color="textSecondary">
            {new Intl.DateTimeFormat('fi-FI').format(
              new Date(review.createdAt)
            )}
          </Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      {myReviews && (
        <Buttons reviewId={review.id} repoId={review.repository.id} />
      )}
    </View>
  );
};

export default ReviewItem;
