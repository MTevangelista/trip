import React, { useState } from 'react';

import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import Input from '../../components/Input';

import './styles.css'

function LeisurePoints() {
    const [place, setPlace] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('')
    
    return (
        <div id="page-leisure-points" className="container">
            <PageHeader pageTitle="Pontos de Lazer" title="Lugares encontrados">
                <form id="search-leisure-places">
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
                </form>
            </PageHeader>
        </div>
    )
}

export default LeisurePoints