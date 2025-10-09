const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { validator } = require('../validators/userValidator');

//Register route
router.post('/api/register', validator, controller.registerUser);
router.post('/api/login', validator, controller.loginUser);

module.exports = router;