import { useQuery } from '@apollo/client';
import { AUTHRORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (includeReviews = false) => {
  const { loading, data } = useQuery(AUTHRORIZED_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return {
    authorizedUser: data?.authorizedUser,
    loading,
  };
};

export default useAuthorizedUser;
