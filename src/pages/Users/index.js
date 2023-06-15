import React, { useEffect, useState } from 'react';

import './styles.css';

//components
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import { MDBInput, MDBBtnGroup } from "mdbreact";

//services
import api from "../../services/api";
import { isEmpty } from "../../functions/validations";

const initialState = {
  id: '',
  name: '',
  email: '',
  password: '',
  access: ''
}

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    ...initialState
  });

  useEffect(() =>{
    async function users(){
      try{
        const response = await api.get('/users');
        setUsers(response.data);
      }catch(err){
        console.log(err)
      }
    }
    users();
  }, [])

  const handleInputValues = (e) =>{
    setValues({
      ...values, 
      [e.target.name] : e.target.value
    })
  }

  const handleFormSubmit = async (e) =>{
    e.preventDefault();
    const { id, ...objToSend} = values;
    setLoading(true);

    try{
        if(isEmpty(objToSend)) throw 'Algum campo não foi preenchido';

        id === '' ? await api.post('/sessions', objToSend) : await api.put(`/users/${id}`, objToSend)

        const newUsers = await api.get('/users');

        setValues(initialState);
        setUsers(newUsers.data);
        setLoading(false);
        setError(id === '' ? 'Login cadastrado com sucesso!' : 'Registro atualizado com sucesso!')

    }catch(err){

      setLoading(false);
      if(typeof(err) !== 'string') err = 'Erro de conexão com o servidor';

      setError(err)
    }
  }

  const deleteUser = async (id) =>{
    const response = await api.delete(`/users/${id}`);
    const newUsers = users.filter(item =>{ return item.id !== id})

    setUsers(newUsers);
  }

  const editUser = async (id) =>{
    const [targetUser] = users.filter(item =>{return item.id === id});
    setValues(targetUser)
  }

  return (
    <div className='user-container'>
      <section className='container-addMenu'>
        <form onSubmit={handleFormSubmit}>
            
            <MDBInput 
              label='Nome'
              className='form-control'
              name='name'
              value={values.name}
              onChange={handleInputValues}
              required
              outline
            />
            <MDBInput 
              label='E-mail' 
              className='form-control'
              name='email'
              type='email'
              value={values.email}
              onChange={handleInputValues}
              required
              outline
            />
            <MDBInput 
              label='Senha' 
              className='form-control'
              name='password'
              value={values.password}
              onChange={handleInputValues}
              required
              outline
            />
            <select 
              className='form-control'
              name='access'
              value={values.access}
              onChange={handleInputValues}
              required
            >
              <option value='' disabled>Selecione um tipo de acesso</option>
              <option value='administrador'>Administrador</option>
              <option value='comum'>Comum</option>
            </select>

            <Button 
              loading={loading}
              buttonClass='btn btn-success btn-block mt-3' 
              buttonText='Salvar'
              spinColor='#fff'
              spinSize={25}
              type='submit'
            />
            <span className='text-danger d-flex justify-content-center p-2 pt-3'>{error}</span>
        </form>
      </section>

      <div className='container'>
        {users.map((item, index) =>(
          <div id={index} className='user-item p-0'>
            <span className='col-3 text-center'>{item.name}</span>
            <span className='col-3 text-center'>{item.email}</span>
            <span className='col-3 text-center'>{item.access}</span>
            <MDBBtnGroup className='col-3'>
              <button onClick={() => editUser(item.id)} className='btn btn-warning col-6 p-3 pt-3 pb-3'>
                <FaPencilAlt />
              </button>
              <button onClick={() => deleteUser(item.id)} className='btn btn-danger col-6 p-3 pt-3 pb-3'>
                <FaTrash />
              </button>
            </MDBBtnGroup>
          </div>
        ))}
      </div>
    </div>
  );
}
