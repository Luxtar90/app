import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import { useRouter } from 'next/router';

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(newErrors);

    if (!Object.keys(newErrors).length && token) {
      try {
        const response = await axios.post('/reset-password', { token, newPassword: password });
        setMessage('Contraseña restablecida exitosamente.');
        setErrors({});
        // Opcionalmente, redirigir al usuario a la página de inicio de sesión
        // router.push('/login');
      } catch (error) {
        setErrors({ general: error.response?.data?.error || 'Error al restablecer la contraseña' });
      }
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        {errors.general && <p>{errors.general}</p>}
        {message && <p>{message}</p>}
        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
