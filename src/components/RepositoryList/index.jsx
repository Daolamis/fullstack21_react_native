import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useDebounce } from 'use-debounce';

import useRepositories from '../../hooks/useRepositories';
import { PressableRepositoryItem } from './RepositoryItem';
import RepositoryFilter from './RepositoryFilter';
import OrderPicker from './OrderPicker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryContainer extends React.Component {
  renderHeader = () => {
    const { changeFilter, filter, changeRepositoryOrder, selectedOrder } =
      this.props;

    return (
      <>
        <RepositoryFilter onChangeText={changeFilter} value={filter} />
        <OrderPicker
          changeRepositoryOrder={changeRepositoryOrder}
          selectedOrder={selectedOrder}
        />
      </>
    );
  };

  render() {
    const { repositories, onEndReach } = this.props;

    const repositoryList = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryList}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={(props) => <PressableRepositoryItem {...props} />}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [filter, setFilter] = useState('');
  const [dFilter] = useDebounce(filter, 500);
  const { repositories, fetchMore } = useRepositories(
    orderBy,
    orderDirection,
    dFilter
  );

  const changeRepositoryOrder = (value) => {
    const [order, direction] = value.split('/');
    setOrderBy(order);
    setOrderDirection(direction);
  };

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryContainer
      repositories={repositories}
      changeFilter={setFilter}
      filter={filter}
      changeRepositoryOrder={changeRepositoryOrder}
      selectedOrder={`${orderBy}/${orderDirection}`}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
