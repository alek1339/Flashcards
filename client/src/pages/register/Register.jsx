import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/reducers/authSlice";
import useAuthRedirect from "../../hooks/useAuthRedirect";

import Notification from "../../components/notification/Notification";

const Register = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const duration = 3000;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  useAuthRedirect();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (!res.msg) {
        setFormData({
          username: "",
          email: "",
          password: "",
          password2: "",
        });
        setIsRegistrationSuccess(true);
      }
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      {isRegistrationSuccess && (
        <Notification
          message="Registration successful! Redirecting to login..."
          duration={duration}
          onClose={() => {
            window.location.href = "/login";
          }}
        />
      )}
    </div>
  );
};

export default Register;
