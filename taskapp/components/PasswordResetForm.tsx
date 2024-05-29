import React, { useState } from 'react';
import axios from '../utils/axiosConfig';

const PasswordResetForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = 'El correo es obligatorio';
    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      try {
        const response = await axios.post('/request-password-reset', { email });
        setMessage('Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico.');
        setErrors({});
      } catch (error) {
        setErrors({ general: error.response?.data?.error || 'Error al enviar el enlace para restablecer la contraseña' });
      }
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        {errors.general && <p>{errors.general}</p>}
        {message && <p>{message}</p>}
        <button type="submit">Enviar Enlace</button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
