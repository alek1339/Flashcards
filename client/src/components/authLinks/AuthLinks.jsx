import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = () => {
  return (
    <div>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        Forgot your password? <Link to="/forgotten-password">Reset Password</Link>
      </p>
    </div>
  );
};

export default AuthLinks;