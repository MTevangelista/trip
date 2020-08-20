import React, { useState } from "react";

import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";

import './styles.css'

function UtilityPoints() {
    const [place, setPlace] = useState('');
    const [week_day, setWeekDay] = useState('');
    
    return (
        <div id="page-utility-points" className="container">
            <PageHeader pageTitle="Pontos de Utilidades" title="Lugares encontrados">
                <form id="search-utility-places">
                    <Select
                        name="place"
                        label="Lugar"
                        value={place}
                        onChange={event => setPlace(event.target.value)}
                        options={[
                            { value: 'Banheiros', label: 'Banheiros' },
                            { value: 'Delegacias', label: 'Delegacias' },
                            { value: 'Hospitais', label: 'Hospitais' },
                            { value: 'Onde dormir', label: 'Onde dormir' },
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
                </form>
            </PageHeader>
        </div>
    );
}

export default UtilityPoints;