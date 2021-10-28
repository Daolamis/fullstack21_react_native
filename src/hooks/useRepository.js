import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });
  const repository = loading ? undefined : data.repository;
  return { repository, loading };
};

export default useRepository;
