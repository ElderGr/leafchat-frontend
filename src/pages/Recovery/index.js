import React from 'react';
import Logo from "../../assets/icons/logo.svg";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import './styles.css';


export default function Recovery(props) {

    const history = useHistory();

    return (
        <>
            <img src={Logo} className="rounded logo mx-auto d-block mb-3" alt='Logo' />

            <div className="recovery-container p-5">
                <form className="">
                    <div onClick={() => history.push('/')}>
                        <FaArrowAltCircleLeft />
                        <h1>Recuperar senha</h1>


                    </div>
                    <input
                        placeholder='Digite seu email'
                        className='form-control mt-2'
                    />

                    <button className='btn btn-success btn-block mt-3'>
                        Recuperar
                </button>
                </form>
            </div>
        </>
    );
}
