import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/reducers/authSlice';
import  useAuthRedirect from '../../hooks/useAuthRedirect';
import AuthLinks from '../../components/authLinks/AuthLinks';

const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useAuthRedirect()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className='error'>{error}</p>}
      <AuthLinks />
    </div>
  );
};

export default Login;