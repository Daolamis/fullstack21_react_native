import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

export const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);

  const signUp = async (user) => {
    const response = await mutate({
      variables: { user },
    });
    return response;
  };
  return [signUp, result];
};
