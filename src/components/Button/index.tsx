import React from 'react';
import { Button, ButtonProps } from '@mui/material';

import { Container } from './styles';

interface ICustonButton extends ButtonProps{
  text: string;
}

function CustonButton({ text, ...props }: ICustonButton) {
  return (
    <Container>
      <Button {...props}>
        {text}
      </Button>
    </Container>
  );
}

export default CustonButton;
