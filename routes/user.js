const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateUniqueToken = require('../controllers/generateUniqueToken');
const sendPasswordResetEmail = require('../controllers/emailController');

const User = require('../models/User');

// Token-based login route
router.post('/token-login', async (req, res) => {

    try {
      // Get the token from the request header
      const token = req.body.token;

      if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }

      // Verify the token
      const decoded = jwt.verify(token, 'your-secret-key');

      // Get the user from the decoded token  
      const user = await User.findById(decoded.user.id);

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Respond to the client with the user object
      res.json(user);
    } catch (error) {
      console.error('THE ERROR IS:', error.message);
      res.status(500).send('Server error' + error.message);
    }
  });

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send('Server error' + error);
    }
});

// Get user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).send('Server error' + error);
    }
});

// Create new user
// POST route for user registration
router.post('/register', async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  
      if (existingUser) {
        return res.status(400).json({ msg: 'Username or email already exists' });
      }
  
      // Hash the password before saving it
      const saltRounds = 10; // You can adjust the number of salt rounds as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({
        username,
        password: hashedPassword, // Save the hashed password
        email,
      });
  
      const user = await newUser.save();
  
      res.json(user);
    } catch (error) {
      res.status(500).send('Server error' + error);
    }
});
  

// Update user
router.put('/:id', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const newUser = {
            username,
            password,
            email,
        };

        const user = await User.findByIdAndUpdate(
            req.params.id,
            newUser,
            { new: true }
        );

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        await user.remove();

        res.json({ msg: 'User removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const expiresIn = '90d';
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
     
      if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid credentials' });
      }
  
      // If the credentials are valid, generate a JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };
      
      // Set a long expiration time for the token (e.g., 1 hour)
      jwt.sign(payload, 'your-secret-key', { expiresIn }, (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });

// Route for initiating a password reset
router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Generate a unique token (e.g., using a library like 'crypto' or 'uuid')

      const token = await generateUniqueToken();
      console.log('Generated Token:', token);
      // Find the user by their email and update the password reset token and its expiration
      const user = await User.findOneAndUpdate(
        { email },
        {
          passwordResetToken: token,
          passwordResetExpires: Date.now() + 3600000, // Token expires in 1 hour (adjust as needed)
        },
        { new: true }
      );
  
      if (!user) {
        // Handle the case where the email doesn't match any user
        return res.status(404).json({ message: 'No user found with that email address' });
      }
  
      // Send a password reset email to the user's email address with a link containing the token
      sendPasswordResetEmail(email, token);
  
      // Respond to the client with a success message
      res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error', error);
      res.status(500).send('Server Error');
    }
  });

// Route for resetting a password

router.post('/reset-password/:token', async (req, res) => {
    console.log('Reset password route hit', req.params);
    try {
        const { password } = req.body;
        const { token } = req.params;
        console.log('Reset password route hit', password);
        // Find the user by the password reset token
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            // Handle the case where the token doesn't match any user
            return res.status(404).json({ message: 'Invalid token' });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Update the user's password and password reset token
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        // Save the updated user object
        await user.save();

        // Respond to the client with a success message
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;