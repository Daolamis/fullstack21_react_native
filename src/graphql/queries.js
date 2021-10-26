import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query reposiories {
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
