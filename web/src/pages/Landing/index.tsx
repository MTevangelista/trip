import React from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import locationIcon from '../../assets/images/icons/location.svg'

import './styles.css'

function Landing() {
    return (
        <div id="page-landing">
            <div id="page-landing-top-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Trip" />
                    <h1>Sua plataforma de <br /> viagens.</h1>
                </div>
            </div>

            <div id="page-landing-bottom-content" className="container">
                <h2>Seja bem-vindo.</h2>
                <h3>O que deseja fazer?</h3>
                <div className="buttons-container">
                    <Link to="leisure-points" className="leisure-points">
                        <img src={locationIcon} alt="Pontos de lazer" />
                        <p>Encontrar pontos de lazer</p>
                    </Link>

                    <Link to="utility-points" className="utility-points">
                        <img src={locationIcon} alt="Pontos de utilidades" />
                        <p>Encontrar pontos de utilidades</p>
                    </Link>
                </div>

                <Link to="register-place" className="register-place">
                    <p>Cadastrar um lugar</p>
                </Link>
            </div>
        </div>
    )
}

export default Landing