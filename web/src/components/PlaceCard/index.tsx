import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import markerIcon from '../../assets/images/icons/marker.svg'
import wallClockIcon from '../../assets/images/icons/wall-clock.svg'

import './styles.css'

export interface Place {
    id: number,
    name: string,
    image_url: string,
    place: string,
    address: string,
    whatsapp: string,
    bio: string,
    uf: string,
    city: string,
    from: number,
    to: number
}

interface PlaceCardProps {
    place: Place
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
    return (
        <article className="place-card">
            <header>
                <img src={place.image_url} alt="Pizzaiolo" />
                <div>
                    <strong>{place.name}</strong>
                    <span>{place.place}</span>
                </div>
            </header>

            <div className="place-card-content">
                <img src={markerIcon} alt="Endereço"/>
                <strong>{place.address} - {place.city}</strong>
            </div>

            <div className="place-card-content">
                <img src={wallClockIcon} alt="Horário"/>
                <strong>Das {place.from} às {place.to}</strong>
            </div>

            <p>{place.bio}</p>

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