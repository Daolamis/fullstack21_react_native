import React from 'react';
import { Pressable } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const AppBarTab = ({ header, to }) => {
  return (
    <Pressable>
      <Link to={to}>
        <Text
          style={{ paddingLeft: 10 }}
          fontSize="subheading"
          color="white"
          fontWeight="bold"
        >
          {header}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
