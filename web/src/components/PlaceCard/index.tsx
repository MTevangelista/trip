import React from 'react'

import convertMinutesToHours from '../../utils/convertMinutesToHours'

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
    const timeInHourFrom = convertMinutesToHours(place.from)
    const timeInHourTo = convertMinutesToHours(place.to)

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
                <img src={markerIcon} alt="Endereço" />
                <strong>{place.address} - {place.city}</strong>
            </div>

            <div className="place-card-content">
                <img src={wallClockIcon} alt="Horário" />
                <strong>Das {timeInHourFrom} às {timeInHourTo}</strong>
            </div>

            <p>{place.bio}</p>

            <footer>
                <a>
                    Calcular rota
                </a>
                <a
                    className="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${place.whatsapp}`}
                >
                    <img src={whatsappIcon} alt="WhatsApp" />
                    Entrar em contato
                </a>
                {/* <button type="submit">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button> */}
            </footer>
        </article>
    )
}

export default PlaceCard