import {
  Card, CardActions, CardContent, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import './styles.css';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Aside from './_components/Aside';

const users = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  name: `user-${index}`,
}));

function Users() {
  const [drawer, setDrawer] = useState(false);

  return (
    <div className="users-container">
      <div>
        <Button text="Adicionar usuário" variant="contained" onClick={() => setDrawer(!drawer)} />
        <Aside
          drawer={drawer}
          setDrawer={setDrawer}
        />
        <Form onSubmit={() => console.log('aa')}>
          <Input
            label="Pesquisar..."
            name="search"
          />
        </Form>
      </div>
      <div className="users-content">
        {users.map((user) => (
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Nome do usuário
              </Typography>
              <Typography variant="h5" component="div">
                {user.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button text="Learn More" size="small" />
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Users;
