import React, { useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps {
  name: string;
  label: string;
  variant?: any;
}

function Input({
  name,
  variant,
  label,
  ...props
}: InputProps) {
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current && inputRef.current.children[1].children[0],
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <TextField
        label={label}
        ref={inputRef}
        variant={variant}
        defaultValue={defaultValue}
        {...props}
      />
    </Container>
  );
}

export default Input;
