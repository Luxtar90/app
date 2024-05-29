import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PasswordResetFormWrapper = styled.div`
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

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  color: #1c1c1e;
  text-align: center;
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

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string } = {};
    if (!email) newErrors.email = 'El correo es obligatorio';
    setErrors(newErrors);
    if (!Object.keys(newErrors).length) {
      try {
        const res = await axios.post('/api/request-password-reset', { email });

        if (res.status === 200) {
          setResetSuccess('Si el correo está registrado, se enviará un correo con instrucciones.');
        } else {
          const { message } = res.data;
          setResetError(message);
        }
      } catch (error) {
        setResetError('Error al solicitar reinicio de contraseña');
      }
    }
  };

  return (
    <PasswordResetFormWrapper>
      <FormContainer>
        <FormSection>
          <Title>Solicitar Reinicio de Contraseña</Title>
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
            {resetError && <ErrorMessage>{resetError}</ErrorMessage>}
            {resetSuccess && <ErrorMessage style={{ color: 'green' }}>{resetSuccess}</ErrorMessage>}
            <SubmitButton type="submit">Enviar</SubmitButton>
          </form>
        </FormSection>
      </FormContainer>
    </PasswordResetFormWrapper>
  );
};

export default PasswordResetForm;
