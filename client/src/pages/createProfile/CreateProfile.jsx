import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '../../store/reducers/profileSlice';

const CreateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    // Dispatch the createProfile action with the form data
    dispatch(createProfile({...formData, user}));
  };

  return (
    <div>
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add more input fields for other profile information */}
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;