import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import markerIcon from '../../assets/images/icons/marker.svg'

import './styles.css'

function PlaceCard() {
    return (
        <article className="place-card">
            <header>
                <img src="https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg" alt="Pizzaiolo" />
                <div>
                    <strong>Pizzaiolo</strong>
                    <span>Restaurante</span>
                </div>
            </header>

            <div className="place-card-content">
                <img src={markerIcon} alt="Endereço"/>
                <strong>Rua são josé, 90 - Rio de Janeiro</strong>
            </div>

            <p>
                O pizzaioloo possui o mehlor rodízio da região. Mais de 1000 pessoas já comeram no nosso restaurante. Com uma vista deslumbrante sobre o mar é o local ideal para o seu almoço no Brasil.
            </p>

            <footer>
                <a>
                    Calcular rota
                </a>
                <button type="submit">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default PlaceCard