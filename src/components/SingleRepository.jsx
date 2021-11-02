import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router';
import useRepository from '../hooks/useRepository';
import theme from '../theme';
import RepositoryItem from './RepositoryList/RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    marginTop: 10,
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

const ReviewItem = ({ review }) => {
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
          {review.user.username}
        </Text>
        <Text style={styles.text} color="textSecondary">
          {new Intl.DateTimeFormat('fi-FI').format(new Date(review.createdAt))}
        </Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  let { repoId } = useParams();
  const { repository, loading } = useRepository(repoId);
  if (loading) {
    return <Text>Loading..</Text>;
  }
  const reviews = repository.reviews.edges.map((r) => r.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} githubButton />
      )}
      // ...
    />
  );
};

export default SingleRepository;
