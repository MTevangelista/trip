import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios'

import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import Input from '../../components/Input';
import PlaceCard, { Place } from '../../components/PlaceCard';

import api from '../../services/api'

import './styles.css'

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

const FindPlaces: React.FC = () => {
    const [places, setPlaces] = useState([])

    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [place, setPlace] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('')

    // Loads all the places of api
    useEffect(() => {
        api.get('/').then(response => {
            setPlaces(response.data)
        })
    }, [])

    // Loads the IBGE API UFS
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla)
            setUfs(ufInitials)
        })
    }, [])

    // Loads the IBGE API cities
    useEffect(() => {
        if (selectedUf === '0') {
            return
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome)
            setCities(cityNames)
        })
    }, [selectedUf])

    async function searchPlaces(event: FormEvent) {
        event.preventDefault()

        const response = await api.get('places', {
            params: {
                uf: selectedUf,
                city: selectedCity,
                place,
                week_day,
                time
            }
        })

        setPlaces(response.data)
    }

    return (
        <div id="page-find-places" className="container">
            <PageHeader pageTitle="Pontos de Lazer" title="Lugares encontrados">
                <form id="search-places" onSubmit={searchPlaces}>
                    <Select
                        name="uf"
                        label="Estado (UF)"
                        required
                        value={selectedUf}
                        onChange={event => setSelectedUf(event.target.value)}
                        options={ufs.map(uf => (
                            { value: `${uf}`, label: `${uf}` }
                        ))}
                    />
                    <Select
                        name="city"
                        label="Cidade"
                        required
                        value={selectedCity}
                        onChange={event => setSelectedCity(event.target.value)}
                        options={cities.map(city => (
                            { value: `${city}`, label: `${city}` }
                        ))}
                    />
                    <Select
                        name="place"
                        label="Lugar"
                        required
                        value={place}
                        onChange={event => setPlace(event.target.value)}
                        options={[
                            { value: 'Eventos', label: 'Eventos' },
                            { value: 'Praias', label: 'Praias' },
                            { value: 'Pontos turísticos', label: 'Pontos turísticos' },
                            { value: 'Onde comer', label: 'Onde comer' },
                            { value: 'Banheiros', label: 'Banheiros' },
                            { value: 'Delegacias', label: 'Delegacias' },
                            { value: 'Hospitais', label: 'Hospitais' },
                            { value: 'Onde dormir', label: 'Onde dormir' },
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        required
                        value={week_day}
                        onChange={event => setWeekDay(event.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        required
                        value={time}
                        onChange={event => setTime(event.target.value)}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {places.map((place: Place) => {
                    return <PlaceCard key={place.id} place={place} />
                })}
            </main>
        </div>
    )
}

export default FindPlaces