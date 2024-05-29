const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Agrega otras rutas aquí

module.exports = router;
