const express = require('express');
const { register, login, requestPasswordReset, resetPassword } = require('../controllers/userController'); // Asegúrate de que esta ruta sea correcta
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

module.exports = router;
