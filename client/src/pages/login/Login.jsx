import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/reducers/authSlice';
import  useAuthRedirect from '../../hooks/useAuthRedirect';
import AuthLinks from '../../components/authLinks/AuthLinks';
import CustomModal from '../../components/customModal/CustomModal';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useAuthRedirect()

  const handleClose = () => {
    setShowModal(false);
    setMessage('');
    window.location.href = '/';
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
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
      <AuthLinks />
      {showModal && (
        <CustomModal message={message} onClose={handleClose} />
      )}
    </div>
  );
};

export default Login;