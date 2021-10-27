import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { SignInForm } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('Calls submit function with correct arguments', async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SignInForm onSubmit={onSubmit} />);
      fireEvent.changeText(getByTestId('usernameField'), 'jaska');
      fireEvent.changeText(getByTestId('passwordField'), 'sala1234');
      fireEvent.press(getByTestId('submitButton'));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'jaska',
          password: 'sala1234',
        });
      });
    });
  });
});
