import {
    sendPasswordResetEmailSuccess,
    sendPasswordResetEmailFailure,
    } from '../store/reducers/authSlice';

export const sendPasswordResetEmailRequest = (email) => async (dispatch) => {
    try {
      // Make an API request to your backend to send a password reset email
      const response = await fetch('http://localhost:1000/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {

        // Dispatch an action to indicate that the email was sent successfully
        dispatch(sendPasswordResetEmailSuccess());
      } else {
        // Dispatch an action to indicate that an error occurred
        dispatch(sendPasswordResetEmailFailure(data.error));
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Dispatch an action to indicate that an error occurred
      dispatch(sendPasswordResetEmailFailure('An error occurred while resetting the password.'));
    }
  };
  