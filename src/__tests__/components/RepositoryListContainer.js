import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryContainer } from '../../components/RepositoryList';

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
  },
  edges: [
    {
      node: {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
      },
      cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
    },
    {
      node: {
        id: 'async-library.react-async',
        fullName: 'async-library/react-async',
        description: 'Flexible promise-based React data loader',
        language: 'JavaScript',
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
      },
      cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    },
  ],
};
describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders all the repositories', () => {
      const { getAllByTestId } = render(
        <RepositoryContainer repositories={repositories} />
      );
      expect(getAllByTestId('repositoryItem')).toHaveLength(2);
    });
    it('renders fullname', () => {
      const { getAllByTestId } = render(
        <RepositoryContainer repositories={repositories} />
      );
      const elements = getAllByTestId('fullname');
      expect(elements[0]).toHaveTextContent('jaredpalmer/formik');
      expect(elements[1]).toHaveTextContent('async-library/react-async');
    });
    it('renders description', () => {
      const { getAllByTestId } = render(
        <RepositoryContainer repositories={repositories} />
      );
      const elements = getAllByTestId('description');
      expect(elements[0]).toHaveTextContent(
        'Build forms in React, without the tears'
      );
      expect(elements[1]).toHaveTextContent(
        'Flexible promise-based React data loader'
      );
    });
    it('renders language', () => {
      const { getAllByTestId } = render(
        <RepositoryContainer repositories={repositories} />
      );
      const elements = getAllByTestId('language');
      expect(elements[0]).toHaveTextContent('TypeScript');
      expect(elements[1]).toHaveTextContent('JavaScript');
    });
    it('renders stars', () => {
      const { getAllByTestId } = render(
        <RepositoryContainer repositories={repositories} />
      );
      const elements = getAllByTestId('stars');
      expect(elements[0]).toHaveTextContent('21.8k');
      expect(elements[1]).toHaveTextContent('1.7k');
    });
    it('renders forks', () => {
      const { getAllByTestId } = render(
        <RepositoryContainer repositories={repositories} />
      );
      const elements = getAllByTestId('forks');
      expect(elements[0]).toHaveTextContent('1.6k');
      expect(elements[1]).toHaveTextContent('69');
    });
    it('renders reviews', () => {
      const { getAllByTestId } = render(
        <RepositoryContainer repositories={repositories} />
      );
      const elements = getAllByTestId('reviews');
      expect(elements[0]).toHaveTextContent('3');
      expect(elements[1]).toHaveTextContent('3');
    });
    it('renders ratings', () => {
      const { getAllByTestId } = render(
        <RepositoryContainer repositories={repositories} />
      );
      const elements = getAllByTestId('ratings');
      expect(elements[0]).toHaveTextContent('88');
      expect(elements[1]).toHaveTextContent('72');
    });
  });
});
