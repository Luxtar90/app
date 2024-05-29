import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import axios from '../utils/axiosConfig';

const LoginFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f7;
  font-family: 'Poppins', sans-serif;
`;

const FormContainer = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

const FormSection = styled.div`
  flex: 1;
  padding: 60px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const LogoText = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: rgba(28, 28, 30, 0.6); /* Color más suave */
  margin-left: 10px;
`;

const ImageSection = styled.div`
  flex: 1;
  background: #f5f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  color: #1c1c1e;
  text-align: center;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SocialButton = styled.button`
  background: #F1F6F9;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e1e6e9;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: rgba(28, 28, 30, 0.6); /* Color más suave */
  margin: 20px 0;

  &::before, &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #E7E7E7;
  }

  &::before {
    margin-right: 0.25em;
  }

  &::after {
    margin-left: 0.25em;
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  background-color: #F1F6F9;
  color: #1c1c1e;
  outline: none;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = 'El correo es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      try {
        const response = await axios.post('/login', { email, password });
        setSuccess('Inicio de sesión exitoso');
        setErrors({});
        // Aquí puedes manejar la redirección después del login
        console.log('User logged in:', response.data);
      } catch (error) {
        setErrors({ general: error.response?.data?.message || 'Error al iniciar sesión' });
      }
    }
  };

  return (
    <LoginFormWrapper>
      <FormContainer>
        <FormSection>
          <LogoContainer>
            <Image src="/logo.png" alt="Logo" width={60} height={60} />
            <LogoText>TaskEase</LogoText>
          </LogoContainer>
          <Title>Iniciar Sesión</Title>
          <SocialLoginContainer>
            <SocialButton>
              <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
            </SocialButton>
            <SocialButton>
              <Image src="/google.png" alt="Google" width={24} height={24} />
            </SocialButton>
            <SocialButton>
              <Image src="/apple.png" alt="Apple" width={24} height={24} />
            </SocialButton>
          </SocialLoginContainer>
          <Divider>o por vía correo</Divider>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </InputContainer>
            {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
            {success && <p>{success}</p>}
            <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
          </form>
          <p>
            ¿No tienes cuenta? <a href="/register">Regístrate</a>
          </p>
        </FormSection>
        <ImageSection>
          <Image src="/portada.png" alt="Imagen de inicio de sesión" width={600} height={600} />
        </ImageSection>
      </FormContainer>
    </LoginFormWrapper>
  );
};

export default LoginForm;
