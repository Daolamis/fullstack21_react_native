import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    alignContent: 'stretch',
    padding: 10,
  },
  filterInput: {
    flexGrow: 1,
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: theme.colors.textSecondary,
    paddingLeft: 35,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
  },
  filterIcon: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  clearIcon: {
    position: 'absolute',
    right: 20,
  },
});

const RepositoryFilter = ({ value, onChangeText }) => {
  const clearInput = () => {
    onChangeText('');
  };
  const searchIcon = '\uD83D\uDD0D'; //Magnifying glass
  return (
    <View style={styles.container}>
      <Text style={styles.filterIcon}>{searchIcon}</Text>
      <TextInput
        style={styles.filterInput}
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable style={styles.clearIcon} onPress={clearInput}>
        <Text>X</Text>
      </Pressable>
    </View>
  );
};

export default RepositoryFilter;
