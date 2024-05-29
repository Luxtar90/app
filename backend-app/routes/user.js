const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /api/users/registro:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error creating user
 */
router.post('/register', register);

router.post('/login', login);

// Agrega otras rutas aquí

module.exports = router;
