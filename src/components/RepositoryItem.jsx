import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: 'white',
  },
  infoAndImage: {
    flexDirection: 'row',
  },
  infoItem: {
    flexDirection: 'column',
    paddingBottom: 5,
  },
  statistics: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  languageItem: {
    marginRight: 'auto',
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    padding: 3,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.infoAndImage}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <View style={styles.infoItem}>
            <Text fontWeight="bold" fontSize="subheading">
              {item.fullName}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text color="textSecondary">{item.description}</Text>
          </View>
          <LanguageItem language={item.language} />
        </View>
      </View>
      <View style={styles.statistics}>
        <StatisticsItem
          value={formatNumber(item.stargazersCount)}
          text="Stars"
        />
        <StatisticsItem value={formatNumber(item.forksCount)} text="Forks" />
        <StatisticsItem value={item.reviewCount} text="Reviews" />
        <StatisticsItem value={item.ratingAverage} text="Ratings" />
      </View>
    </View>
  );
};

const StatisticsItem = ({ text, value }) => {
  return (
    <View>
      <Text fontWeight="bold">{value}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const LanguageItem = ({ language }) => {
  return (
    <View style={styles.languageItem}>
      <Text color="white">{language}</Text>
    </View>
  );
};

const formatNumber = (value) => {
  if (value < 1000) {
    return value;
  } else {
    const thousands = parseInt(value / 1000);
    let hundreds = parseInt((value % 1000) / 100);
    hundreds = hundreds >= 1 ? '.' + hundreds : '';

    return `${thousands}${hundreds}k`;
  }
};

export default RepositoryItem;
