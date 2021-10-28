import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      edges {
        node {
          id
          ownerName
          fullName
          description
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const AUTHRORIZED_USER = gql`
  query authorizedUser {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      ownerName
      fullName
      description
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      language
      ownerAvatarUrl
      url
    }
  }
`;
