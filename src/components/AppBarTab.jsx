import React from 'react';
import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({ header }) => {
  return (
    <Pressable>
      <Text
        style={{ paddingLeft: 10 }}
        fontSize="subheading"
        color="white"
        fontWeight="bold"
      >
        {header}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
