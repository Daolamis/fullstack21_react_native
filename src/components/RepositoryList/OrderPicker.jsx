import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';

const styles = StyleSheet.create({
  picker: {
    backgroundColor: theme.colors.appBackground,
    padding: 10,
  },
});

const OrderPicker = ({ changeRepositoryOrder, selectedOrder }) => {
  return (
    <>
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
    </>
  );
};

export default OrderPicker;
