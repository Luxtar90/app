import React, { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import axios from '../utils/axiosConfig';

const RegisterFormWrapper = styled.div`
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
  color: rgba(28, 28, 30, 0.6);
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
  color: rgba(28, 28, 30, 0.6);
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

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const InputContainer = styled.div`
  position: relative;
  flex: 1;
  &:not(:last-child) {
    margin-right: 20px;
  }
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

const InputFullWidth = styled(Input)`
  width: 100%;
  margin-bottom: 26px;
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const CheckboxLabel = styled.label`
  margin-left: 8px;
  font-size: 14px;
`;

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!firstName) newErrors.firstName = 'El nombre es obligatorio';
    if (!lastName) newErrors.lastName = 'El apellido es obligatorio';
    if (!phone) newErrors.phone = 'El teléfono es obligatorio';
    if (!username) newErrors.username = 'El nombre de usuario es obligatorio';
    if (!email) newErrors.email = 'El correo es obligatorio';
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    if (!confirmPassword) newErrors.confirmPassword = 'La confirmación de contraseña es obligatoria';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(newErrors);

    if (!Object.keys(newErrors).length) {
      try {
        const response = await axios.post('/users/register', {
          firstName,
          lastName,
          phone,
          username,
          email,
          password,
        });
        setSuccess('Registro exitoso. Por favor, revisa tu correo para verificar tu cuenta.');
        setErrors({});
        // Restablecer el formulario
        setFirstName('');
        setLastName('');
        setPhone('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        setErrors({ general: error.response?.data?.error || 'Error al registrar usuario' });
      }
    }
  };

  return (
    <RegisterFormWrapper>
      <FormContainer>
        <FormSection>
          <LogoContainer>
            <Image src="/logo.png" alt="Logo" width={60} height={60} />
            <LogoText>TaskEase</LogoText>
          </LogoContainer>
          <Title>Regístrate</Title>
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
            <InputRow>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="Nombres"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="Apellidos"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
              </InputContainer>
            </InputRow>
            <InputRow>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
              </InputContainer>
              <InputContainer>
                <Input
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
              </InputContainer>
            </InputRow>
            <InputFullWidth
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <InputContainer>
              <InputFullWidth
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
            <InputContainer>
              <InputFullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <ShowPasswordButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Image src="/eye.png" alt="Mostrar contraseña" width={24} height={24} />
              </ShowPasswordButton>
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            </InputContainer>
            <CheckboxContainer>
              <input
                type="checkbox"
                id="remember"
              />
              <CheckboxLabel htmlFor="remember">Recuérdame</CheckboxLabel>
            </CheckboxContainer>
            {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
            {success && <p>{success}</p>}
            <SubmitButton type="submit">Registrarse</SubmitButton>
          </form>
          <p>
            ¿Ya tienes cuenta? <a href="/login">Inicia Sesión</a>
          </p>
        </FormSection>
        <ImageSection>
          <Image src="/portada.png" alt="Imagen de registro" width={600} height={600} />
        </ImageSection>
      </FormContainer>
    </RegisterFormWrapper>
  );
};

export default RegisterForm;
