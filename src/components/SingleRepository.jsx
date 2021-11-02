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

class SingleRepositoryContainer extends React.Component {
  renderHeader() {
    return <RepositoryItem item={this.props.repository} githubButton />;
  }
  render() {
    const { repository, onEndReach } = this.props;
    const reviews = repository
      ? repository.reviews.edges.map((r) => r.node)
      : [];
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => this.renderHeader(repository)}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const SingleRepository = () => {
  const { repoId } = useParams();
  const { repository, fetchMore } = useRepository(repoId);

  const onEndReach = () => {
    console.log('reviews end, fetch more..');
    fetchMore();
  };
  return (
    <SingleRepositoryContainer
      repository={repository}
      onEndReach={onEndReach}
    />
  );
};

export default SingleRepository;
