import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useHistory } from 'react-router';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: theme.colors.appBackground,
    padding: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = ({ changeRepositoryOrder, selectedOrder }) => {
  return (
    <Picker
      style={styles.picker}
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => changeRepositoryOrder(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="CREATED_AT/DESC" />
      <Picker.Item
        label="Highest rated repositories"
        value="RATING_AVERAGE/DESC"
      />
      <Picker.Item
        label="Lowest rated repositories"
        value="RATING_AVERAGE/ASC"
      />
    </Picker>
  );
};

export const RepositoryContainer = ({
  repositories,
  changeRepositoryOrder,
  selectedOrder,
}) => {
  const repositoryList = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryList}
      ListHeaderComponent={() => (
        <OrderPicker
          changeRepositoryOrder={changeRepositoryOrder}
          selectedOrder={selectedOrder}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => <PressableRepositoryItem {...props} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const PressableRepositoryItem = ({ item, ...props }) => {
  const history = useHistory();
  const onPress = () => {
    history.push(`/repository/${item.id}`);
  };

  return (
    <Pressable onPress={onPress}>
      <RepositoryItem item={item} {...props} />
    </Pressable>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const { repositories } = useRepositories(orderBy, orderDirection);

  const changeRepositoryOrder = (value) => {
    const [order, direction] = value.split('/');
    setOrderBy(order);
    setOrderDirection(direction);
  };

  return (
    <RepositoryContainer
      repositories={repositories}
      changeRepositoryOrder={changeRepositoryOrder}
      selectedOrder={`${orderBy}/${orderDirection}`}
    />
  );
};

export default RepositoryList;
