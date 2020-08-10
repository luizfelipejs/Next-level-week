import React, {useState, FormEvent} from 'react';
import './index.css'

import PageHeader from '../../components/pageHeader/index'
import Profy from '../../components/profy';
import Input from '../../components/inputs/index'
import Select from '../../components/select/index'

import ButtonImageSearch from '../../assets/images/search.png'

import Api from '../../services/api'

interface profySchema {
    name: string
    cost: string
    subject: string
    bio: string
    avatar: string
    id: string
}

function ProfysList () { 

    const [dataProfys, setDataprofys] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeek_day] = useState('')
    const [hour, setHour] = useState('')

    async function HandleSearchProfy(e: FormEvent) {
        e.preventDefault()
        const {data} = await Api.get("/profy", 
            {
                params: {
                    subject,
                    week_day,
                    hour
                }
            }
        )
        setDataprofys(data.response)
        console.log({message: data.response});
        
    }


    return (
        <>
            <PageHeader text="Estes sao os profys disponiveis" link="/">
                <form className="filter" onSubmit={HandleSearchProfy}>
                    <Select 
                        label="materia" 
                        name="materia"
                        className="select-input"
                        onChange={e => setSubject(e.target.value)}
                        options={
                            [
                                {option: "portugues", label: "portugues"},
                                {option: "Matematica", label: "Matematica"},
                                {option: "Quimica", label: "Quimica"},
                                {option: "Fisica", label: "Fisica"},
                                {option: "Filosofia", label: "Filosofia"},
                                {option: "Historia", label: "Historia"},
                                {option: "Artes", label: "Artes"},
                                {option: "Educaçao fisica", label: "Educaçao fisica"},
                                {option: "Redaçao", label: "Redaçao"},
                                {option: "geografia", label: "geografia"},
                            ]
                        } 
                    />
                    <Select 
                        className="select-input" 
                        label="dia-da-semana-study" 
                        onChange={e => setWeek_day(e.target.value)}
                        name="dia da semana" 
                        options={
                        [
                            {label: "0", option: "domingo"},
                            {label: "1", option: "segunda-feira"},
                            {label: "2", option: "terça-feira"},
                            {label: "3", option: "quart-feira"},
                            {label: "4", option: "quinta-feira"},
                            {label: "5", option: "sexta-feira"},
                            {label: "6", option: "sabado"},
                        ]
                    }/>
                    <Input 
                        name="Horario" 
                        label="horario" 
                        type="time"
                        onChange={e => setHour(e.target.value)}
                    />
                    <button className="submit" type="submit" id="buscar" >
                        Buscar
                        <img src={ButtonImageSearch} alt="buscar professores" className="search-button" />
                    </button>
                </form>
            </PageHeader>
            <ul className="profys">
                {dataProfys.map((data: profySchema) => {
                    console.log(data.id);
                    
                    return (
                        <Profy 
                        key={data.id}
                        id={data.id}
                        nome={data.name} 
                        linkFoto={data.avatar} 
                        preço={data.cost} 
                        biografia={data.bio} 
                        materia={data.subject}
                        />
                    );
                })}
               
            </ul>
        </>

    )
}

export default ProfysList