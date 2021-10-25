import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Reposiories {
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
