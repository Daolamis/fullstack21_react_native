import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
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
});

const ReviewItem = ({ review, myReviews }) => {
  const reviewTitle = myReviews
    ? review.repository.fullName
    : review.user.username;

  return (
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
          {new Intl.DateTimeFormat('fi-FI').format(new Date(review.createdAt))}
        </Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
