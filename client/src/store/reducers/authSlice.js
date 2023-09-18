import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { sendPasswordResetEmailRequest } from '../../api/sendPasswordResetEmailRequest';
import { getProfile } from './profileSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      sendPasswordResetEmailFailure: (state, action) => {
        state.error = action.payload;
      },
      sendPasswordResetEmailSuccess: (state) => {
        state.passwordResetEmailSent = true;
        state.error = null;
      },
      logoutUser: (state) => {
        state.user = null;
      },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const registerUser = (userData) => async (dispatch) => {
  try {
    // Register the user by making an API request
    const response = await fetch('http://localhost:1000/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    dispatch(setUser(data.user));
  } catch (error) {
    console.error('Registration failed', error);
    // Handle registration failure (e.g., show an error message)
  }
};

// Login action
export const loginUser = (userData) => async (dispatch) => {
    try {
      // Make an API request to your backend to login the user
      const response = await fetch('http://localhost:1000/user/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const { token } = data;
      
      // Store the token in the browser cookies
     if (token) {
        Cookies.set('authToken', token);
        dispatch(getProfile(data.user.id));
     }
      
      dispatch(setUser(data.user));
    } catch (error) {
      console.error('Login failed', error);
      // TODO: Handle login failure (e.g., show an error message)
    }
  };

  // Token-based login action
export const tokenLogin = (token) => async (dispatch) => {
    try {
      // Make an API request to your backend to login the user
      const response = await fetch('http://localhost:1000/user/token-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
      });
      const data = await response.json();
      dispatch(setUser(data));
    } catch (error) {
      console.error('Login failed', error);
      // TODO: Handle login failure (e.g., show an error message)
    }
  };


// Action for sending a password reset email
export const sendPasswordResetEmail = (email) => async (dispatch) => {
    try {
      // Call your API function to send the email and await it
      await sendPasswordResetEmailRequest(email)(dispatch);
      // Dispatch an action to indicate that the email was sent successfully
      dispatch(sendPasswordResetEmailSuccess());
    } catch (error) {
      console.error('Error sending email:', error);
      // Dispatch an action to indicate that an error occurred
      dispatch(sendPasswordResetEmailFailure());
    }
  };

  export const sendPasswordResetEmailSuccess = () => ({
    type: 'SEND_PASSWORD_RESET_EMAIL_SUCCESS',
  });
  
  export const sendPasswordResetEmailFailure = () => ({
    type: 'SEND_PASSWORD_RESET_EMAIL_FAILURE',
  });

export default authSlice.reducer;