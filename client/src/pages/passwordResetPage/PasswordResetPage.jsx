import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../api/resetPasswordRequest';

function PasswordResetPage() {
  const { token } = useParams();

  // Define state variables for the new password and confirmation
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  const handlePasswordReset = async () => {
    try {
      // Verify the token and reset the password on the server
      const response = await resetPassword(token, newPassword);
      
      if (response.ok) {
        // Password reset was successful
        setResetSuccess(true);
        setResetError(null);
      } else {
        // Password reset failed, handle the error
        const errorData = await response.json();
        setResetSuccess(false);
        setResetError(errorData.error);
      }
    } catch (error) {
      console.error('Password reset failed:', error);
      setResetSuccess(false);
      setResetError('An error occurred while resetting the password.');
    }
  };

  return (
    <div>
      {resetSuccess ? (
        <p>Password reset successful!</p>
      ) : (
        <>
          <h2>Reset Your Password</h2>
          {resetError && <p>Error: {resetError}</p>}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
        </>
      )}
    </div>
  );
}

export default PasswordResetPage;