const { User } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

let resetTokens = new Map();

const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio de correo que estés utilizando (por ejemplo, 'hotmail', 'yahoo', etc.)
  auth: {
    user: 'laas.1314693597@gmail.com', // Tu correo electrónico
    pass: 'Luiggi123.e', // Tu contraseña del correo electrónico
  },
});

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, phone, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, phone, username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(`Password reset requested for email: ${email}`); // Agregar registro

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(`User not found for email: ${email}`); // Agregar registro
      return res.status(404).json({ error: 'User not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    resetTokens.set(token, user.email);
    console.log(`Generated token: ${token} for email: ${email}`); // Agregar registro

    const mailOptions = {
      from: 'your-email@gmail.com', // Tu correo electrónico
      to: user.email,
      subject: 'Password Reset Request',
      text: `To reset your password, click on this link: http://localhost:3000/reset-password/${token}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to: ${user.email}`); // Agregar registro

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending email:', error); // Agregar registro
    res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const email = resetTokens.get(token);

    if (!email) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const user = await User.findOne({ where: { email } });
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    resetTokens.delete(token);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
