import React, { useState } from 'react';

//style
import './styles.css';

//components
import { FaArrowAltCircleLeft } from "react-icons/fa";
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import Logo from "../../assets/icons/logo.svg";
import Button from "../../components/button";

//navigation
import { useHistory } from "react-router-dom";

//functions
import { isEmpty } from "../../functions/validations";
import api from '../../services/api';
import { MDBInput } from 'mdbreact';


export default function Signup() {

    const history = useHistory();

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })
    const [loading, setLoading] = useState(false);


    const handleFormValues = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const existVoid = isEmpty(formValues);

            // validação se campos foram preenchidos
            if (existVoid) throw new Error("Todos os campos devem ser preenchidos!");
            if (formValues.password !== formValues.passwordConfirmation) throw new Error("Valor da confirmação de senha está diferente da senha inserida");

            const { passwordConfirmation, ...user } = formValues

            await api.post('/sessions', user);
            setLoading(false);

            store.addNotification({
                title: "Sucesso!",
                message: "Cadastro realizado com sucesso",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2500,
                    onScreen: true
                },
            })

            setTimeout(() => {
                history.push('/');
            }, 2500);

        } catch (err) {
            if (typeof (err) !== 'string') err = "Erro ao tentar cadastrar seus dados!"

            setLoading(false);
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
            <img src={Logo} className="rounded logo mx-auto d-block mb-3" />
            <div className="signup-container p-5">
                <form onSubmit={handleFormValues}>
                    <div>
                        <FaArrowAltCircleLeft onClick={() => history.push('/')} />
                        <h1>Cadastre-se</h1>
                    </div>

                    <MDBInput
                        className="mt-2"
                        label='Nome'
                        name='name'
                        value={formValues.name}
                        onChange={(e) => setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value
                        })}
                        outline
                    />

                    <MDBInput
                        label='E-mail'
                        name='email'
                        value={formValues.email}
                        onChange={(e) => setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value
                        })}
                        outline
                    />

                    <MDBInput
                        label='Senha'
                        type='password'
                        name='password'
                        onChange={(e) => setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value
                        })}
                        outline
                    />

                    <MDBInput
                        label='Confirmar senha'
                        type='password'
                        name='passwordConfirmation'
                        onChange={(e) => setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value
                        })}
                        outline
                    />

                    <Button
                        loading={loading}
                        buttonClass='btn btn-success btn-block'
                        buttonText='Criar uma conta'
                        spinColor='#fff'
                        spinSize={25}
                        type='submit'
                    />
                </form>
            </div>
        </>
    );
}
