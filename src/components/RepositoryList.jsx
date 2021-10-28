import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryContainer = ({ repositories }) => {
  const repositoryList = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = (props) => {
    return <PressableRepositoryItem {...props} />;
  };
  return (
    <FlatList
      data={repositoryList}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const PressableRepositoryItem = ({ item, ...props }) => {
  const history = useHistory();
  const onPress = () => {
    console.log(`pressed ${item.id}`);
    history.push(`/repository/${item.id}`);
  };

  return (
    <Pressable onPress={onPress}>
      <RepositoryItem item={item} {...props} />
    </Pressable>
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryContainer repositories={repositories} />;
};

export default RepositoryList;
