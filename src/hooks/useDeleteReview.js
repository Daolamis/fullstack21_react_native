import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { AUTHRORIZED_USER } from '../graphql/queries';

export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const response = await mutate({
      variables: { id },
      refetchQueries: [{ query: AUTHRORIZED_USER }],
    });

    return response;
  };
  return [deleteReview, result];
};
