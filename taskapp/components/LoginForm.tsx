import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';

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
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 12px;
  padding-right: 40px;
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

const ShowPasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const CheckboxLabel = styled.label`
  margin-left: 8px;
  font-size: 14px;
`;

const LoginFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const ForgotPasswordLink = styled.a`
  font-size: 14px;
  color: #007aff;
  cursor: pointer;
`;

const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string, password?: string } = {};
    if (!email) newErrors.email = 'El correo es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        const res = await axios.post('/api/login', { email, password });

        if (res.status === 200) {
          const { token } = res.data;
          // Guardar el token y redirigir al usuario
          localStorage.setItem('token', token);
          router.push('/dashboard'); // Cambia '/dashboard' por la ruta adecuada
        } else {
          const { message } = res.data;
          setLoginError(message);
        }
      } catch (error) {
        setLoginError('Error al iniciar sesión');
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
          <Title>Inicia Sesión</Title>
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
          <Divider>o por via correo</Divider>
          <form onSubmit={handleSubmit}>
            <InputContainer>
              <Input
                type="email"
                placeholder="Usuario / Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </InputContainer>
            <InputContainer>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ShowPasswordButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Image src="/eye.png" alt="Mostrar contraseña" width={24} height={24} />
              </ShowPasswordButton>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </InputContainer>
            {loginError && <ErrorMessage>{loginError}</ErrorMessage>}
            <FormActions>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  id="remember"
                />
                <CheckboxLabel htmlFor="remember">Recuérdame</CheckboxLabel>
              </CheckboxContainer>
              <SubmitButton type="submit">Iniciar Sesión</SubmitButton>
            </FormActions>
            <ForgotPasswordLink href="/password-reset">¿Olvidaste tu contraseña?</ForgotPasswordLink>
          </form>
          <p>
            ¿Aún no tienes cuenta? <a href="/register">Regístrate</a>
          </p>
        </FormSection>
      </FormContainer>
    </LoginFormWrapper>
  );
};

export default LoginForm;
