import { Form } from '@unform/web';
import React from 'react';
import { SwipeableDrawer } from '@mui/material';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import { useStyles } from './styles';

interface Props{
  drawer: boolean;
  setDrawer(value: boolean): void;
}

function Aside({
  drawer,
  setDrawer,
}: Props) {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      open={drawer}
      className={classes.aside}
      onClose={() => setDrawer(false)}
      onOpen={() => setDrawer(true)}
      anchor="right"
    >
      <Form onSubmit={() => console.log('')}>
        <h2>Novo usuário</h2>
        <span>Preencha as informações para adicionar um novo usuário</span>
        <Input
          name="name"
          label="Nome"
        />
        <Input
          name="permission"
          label="Permissão"
        />
        <Input
          name="email"
          label="Email"
        />
        <Input
          name="password"
          label="Senha"
        />

        <Button variant="contained" text="Cadastrar" />
      </Form>
    </SwipeableDrawer>
  );
}

export default Aside;
