import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { authorizedUser } = useAuthorizedUser(true);
  const reviews = authorizedUser
    ? authorizedUser.reviews.edges.map((r) => r.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} myReviews />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
