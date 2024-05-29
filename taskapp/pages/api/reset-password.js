import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, newPassword } = req.body;

    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true },
    });

    if (passwordReset && passwordReset.expiresAt > new Date()) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: passwordReset.userId },
        data: { password: hashedPassword },
      });

      await prisma.passwordReset.delete({ where: { id: passwordReset.id } });

      res.status(200).json({ message: 'Password reset successful' });
    } else {
      res.status(400).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
