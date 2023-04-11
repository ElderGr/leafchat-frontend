import React, {
  useState, InputHTMLAttributes, useRef, useEffect,
} from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextFieldProps,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useField } from '@unform/core';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<TextFieldProps> {
  name: string;
  label: string;
}

function InputPassword({
  name,
  ...props
}: InputProps) {
  const {
    fieldName, defaultValue, error, registerField,
  } = useField(name);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current && inputRef.current.children[0],
      path: 'value',
    });
  }, [fieldName, registerField]);

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{props.label}</InputLabel>
        <OutlinedInput
          ref={inputRef}
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          defaultValue={defaultValue}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            )}
          label={props.label}
        />
      </FormControl>
    </Container>

  );
}

export default InputPassword;
