import React from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
import locationIcon from '../../assets/images/icons/location.svg'
import AddPlaceIcon from '../../assets/images/icons/icons-add.svg'

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
                    <Link to="find-places" className="find-places">
                        <img src={locationIcon} alt="Lugares" />
                        <p>Encontrar lugares</p>
                    </Link>

                    <Link to="register-place" className="register-place">
                        <img src={AddPlaceIcon} alt="Lugares" />
                        <p>Cadastrar um lugar</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing