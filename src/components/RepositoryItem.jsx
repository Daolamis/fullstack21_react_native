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
    flexDirection: 'row',
  },
  languageText: {
    flexGrow: 0,
    borderRadius: 5,
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 3,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.listItem}>
      <View style={styles.infoAndImage}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <View style={styles.infoItem}>
            <Text testID="fullname" fontWeight="bold" fontSize="subheading">
              {item.fullName}
            </Text>
          </View>
          <View testID="description" style={styles.infoItem}>
            <Text color="textSecondary">{item.description}</Text>
          </View>
          <LanguageItem language={item.language} />
        </View>
      </View>
      <View style={styles.statistics}>
        <StatisticsItem
          testID="stars"
          value={formatNumber(item.stargazersCount)}
          text="Stars"
        />
        <StatisticsItem
          testID="forks"
          value={formatNumber(item.forksCount)}
          text="Forks"
        />
        <StatisticsItem
          testID="reviews"
          value={item.reviewCount}
          text="Reviews"
        />
        <StatisticsItem
          testID="ratings"
          value={item.ratingAverage}
          text="Ratings"
        />
      </View>
    </View>
  );
};

const StatisticsItem = ({ testID, text, value }) => {
  return (
    <View>
      <Text testID={testID} fontWeight="bold">
        {value}
      </Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

const LanguageItem = ({ language }) => {
  return (
    <View style={styles.languageItem}>
      <Text testID="language" style={styles.languageText}>
        {language}
      </Text>
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
