import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api'

import './styles.css'

interface IBGEUFResponse {
    sigla: string
}

interface IBGECityResponse {
    nome: string
}

function PlaceForm() {
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [name, setName] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [address, setAddress] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [place, setPlace] = useState('');
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ])

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

    async function addNewScheduleItem() {
        if (await scheduleItems.length === 6) {
            const btnAddNewScheduleItem = document.getElementById('btn_addNewScheduleItem')
            if (btnAddNewScheduleItem !== null) {
               await btnAddNewScheduleItem.classList.add("disabledCard");
            }
            return
        } else {
            setScheduleItems([
                ...scheduleItems,
                { week_day: 0, from: '', to: '' }
            ])
    
            scheduleItems.push()
        }
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })
        setScheduleItems(updatedScheduleItems)
    }

    function handleCreatePlace(event: FormEvent) {
        event.preventDefault()

        api.post('/places', {
            name,
            image_url,
            place,
            address,
            whatsapp,
            bio,
            uf: selectedUf,
            city: selectedCity,
            schedule: scheduleItems
        }).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado com sucesso!',
                showConfirmButton: false,
                timer: 1700
            })
        }).catch(() => {
            Swal.fire({
                icon: 'error',
                title: 'Erro no cadastro!',
                showConfirmButton: false,
                timer: 1700
            })
        })
    }

    return (
        <div id="page-place-form" className="container">
            <PageHeader
                pageTitle="Cadastrar Lugar"
                title="Cadastre um lugar na plataforma"
                description="O primeiro passo é preencher esse formulário de cadastro"
            />

            <main>
                <form onSubmit={handleCreatePlace}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome do lugar"
                            required
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <Input
                            name="image_url"
                            label="Image (URL)"
                            required
                            value={image_url}
                            onChange={event => setImageUrl(event.target.value)}
                        />
                        <Input
                            name="address"
                            label="Endereço"
                            required
                            value={address}
                            onChange={event => setAddress(event.target.value)}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            required
                            value={whatsapp}
                            onChange={event => setWhatsapp(event.target.value)}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            required
                            value={bio}
                            onChange={event => setBio(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre o lugar</legend>

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
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button id="btn_addNewScheduleItem" type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week-day"
                                        label="Dia da semana"
                                        required
                                        value={scheduleItem.week_day}
                                        onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
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
                                        name="from"
                                        label="Das"
                                        required
                                        value={scheduleItem.from}
                                        onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                                    />
                                    <Input
                                        type="time"
                                        name="to"
                                        label="Até"
                                        required
                                        value={scheduleItem.to}
                                        onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default PlaceForm