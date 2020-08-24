import React, { useState, useEffect } from 'react';
import axios from 'axios'

import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import Input from '../../components/Input';
import PlaceCard from '../../components/PlaceCard';

import './styles.css'

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

function LeisurePoints() {
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [place, setPlace] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('')

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

    return (  
        <div id="page-leisure-points" className="container">
            <PageHeader pageTitle="Pontos de Lazer" title="Lugares encontrados">
                <form id="search-leisure-places">
                    <Select
                        name="uf"
                        label="Estado (UF)"
                        value={selectedUf}
                        onChange={event => setSelectedUf(event.target.value)}
                        options={ufs.map(uf => (
                            { value: `${uf}`, label: `${uf}` }
                        ))}
                    />
                    <Select
                        name="city"
                        label="Cidade"
                        value={selectedCity}
                        onChange={event => setSelectedCity(event.target.value)}
                        options={cities.map(city => (
                            { value: `${city}`, label: `${city}` }
                        ))}
                    />
                    <Select
                        name="place"
                        label="Lugar"
                        value={place}
                        onChange={event => setPlace(event.target.value)}
                        options={[
                            { value: 'Eventos', label: 'Eventos' },
                            { value: 'Praias', label: 'Praias' },
                            { value: 'Pontos turísticos', label: 'Pontos turísticos' },
                            { value: 'Onde comer', label: 'Onde comer' },
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
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
                        value={time}
                        onChange={event => setTime(event.target.value)}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                <PlaceCard />
                <PlaceCard />
            </main>
        </div>
    )
}

export default LeisurePoints