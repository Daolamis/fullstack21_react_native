import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryList/RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

class SingleRepositoryContainer extends React.Component {
  renderHeader() {
    if (!this.props.repository) {
      return null;
    }
    return (
      <>
        <RepositoryItem
          style={{ marginBottom: 10 }}
          item={this.props.repository}
          githubButton
        />
        <ItemSeparator />
      </>
    );
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
        ItemSeparatorComponent={ItemSeparator}
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
