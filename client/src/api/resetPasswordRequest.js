// api/resetPasswordRequest.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:1000'; // Update with your API URL

export const resetPassword = async (token, newPassword) => {
    const response = await axios.post(`${API_BASE_URL}/user/reset-password/${token}`, {
      password: newPassword,
    });

    return response;
};