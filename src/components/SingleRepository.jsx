import React from 'react';
import { useParams } from 'react-router';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const SingleRepository = () => {
  let { repoId } = useParams();
  const { repository, loading } = useRepository(repoId);
  if (loading) {
    return <Text>Loading..</Text>;
  }
  return <RepositoryItem item={repository} githubButton />;
};

export default SingleRepository;
