import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, CustomForm } from './styles';
import Input from '../../components/Input';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/Button';

function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log(data);
    navigate('/home');
  };

  return (
    <Container>
      <div>
        <Box
          sx={{
            width: '450px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: 1,
            padding: '15px 20px',
            zIndex: '999',
          }}
        >
          <CustomForm onSubmit={handleSubmit}>
            <h2>Leafchat</h2>
            <Input
              name="Login"
              label="Login"
              variant="outlined"
            />
            <InputPassword
              name="password"
              label="Password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              text="Entrar"
            />
          </CustomForm>
        </Box>
      </div>
      <div className="custom-shape-divider-bottom-1650816291">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" />
        </svg>
      </div>
    </Container>
  );
}

export default SignIn;
