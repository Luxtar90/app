import prisma from '../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const token = uuidv4();
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour expiration

      await prisma.passwordReset.create({
        data: { userId: user.id, token, expiresAt },
      });

      // Aquí enviarías el correo electrónico con el token al usuario
    }

    res.status(200).json({ message: 'If that email address is in our database, we will send you an email to reset your password.' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
