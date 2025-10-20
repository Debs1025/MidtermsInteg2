require('dotenv').config();
const service = require('../services/userServices');

async function registerUser (req, res) {
   try {
      const { username, password, role, id } = req.body;
      const user = await service.registerUser({ username, password, role, id });
      user.password = undefined; 
      res.status(201).json({ success: true, message: 'User registered successfully', data: { user } });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
}

async function loginUser (req, res) {
   try {
      const { username, password } = req.body;
      const { user, token } = await service.authenticateUser(username, password);
      user.password = undefined; 
      res.status(200).json({ success: true, message: 'Login successful', data: { user, token } });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
}

module.exports = { registerUser, loginUser };