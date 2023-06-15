import React, { useState } from 'react';

//style
import './styles.css';
import { Link, useHistory } from 'react-router-dom';

//assets
import Logo from "../../assets/icons/logo.svg";

//components
import Button from "../../components/button";
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';

//functions
import { isEmpty } from "../../functions/validations";

//services
import api from "../../services/api";

export default function Login() {

    const history = useHistory();

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isValid = isEmpty(formValues);

        try {
            if (isValid) throw new Error("Preencha todas as informações para realizar o login");

            const response = await api.post('/users', formValues);
            setLoading(false);

            localStorage.setItem('usuario-leafchat', response.data.token);
            history.push('/home');
        }
        catch (err) {
            setLoading(false);

            if (typeof (err) !== 'string') err = 'Login não cadastrado!'

            store.addNotification({
                title: "Erro!",
                message: err,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    }


    return (
        <>
            <ReactNotification />
            <img src={Logo} className="rounded mx-auto logo d-block mb-3" alt='Logo' />

            <div className="login-container p-5">
                <form onSubmit={handleSubmit}>
                    <h1>Bem vindo ao Leaf Chat</h1>
                    <input
                        placeholder='E-mail'
                        className='form-control mt-3 mb-3'
                        value={formValues.login}
                        name='email'
                        onChange={e => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
                    />

                    <input
                        placeholder='Senha'
                        className='form-control mb-3'
                        value={formValues.password}
                        type='password'
                        name='password'
                        onChange={e => setFormValues({ ...formValues, [e.target.name]: e.target.value })}
                    />

                    <Button
                        buttonClass='btn btn-success btn-block mb-3'
                        buttonText='Entrar'
                        loading={loading}
                        spinColor="#fff"
                        spinSize={25}
                        type='submit'
                    />
                    <span>
                        <Link to='/recovery' className='link'>Esqueceu sua senha?</Link>
                    </span>
                    <span>
                        Não tem uma conta ainda? <Link to='/signup' className='link'>Cadastre-se!</Link>
                    </span>

                </form>
            </div>
        </>
    );
}
