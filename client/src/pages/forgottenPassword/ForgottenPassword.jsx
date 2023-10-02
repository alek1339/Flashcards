import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendPasswordResetEmail } from '../../store/reducers/authSlice';
import  useAuthRedirect  from '../../hooks/useAuthRedirect';

const ForgottenPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useAuthRedirect()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the sendPasswordResetEmail action with the email
      await dispatch(sendPasswordResetEmail(email));
      setMessage('Password reset email sent successfully');
      setError('');
    } catch (error) {
      console.log(error);
      setError('An error occurred while resetting the password.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ForgottenPassword;