import React, {useState, MouseEvent} from 'react';
import {useHistory} from 'react-router-dom'

import './index.css'

import PageHeader from '../../components/pageHeader';
import Input from '../../components/inputs/index'
import Select from '../../components/select/index' 

import Api from '../../services/api'

import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/textarea';

export default function ProfyList () {

    const History = useHistory()

    //Horarios do profy
    const [ schedule, setScheduleItem ] = useState([{ week_day: 0, from: '', to: '' }])
    //Dados do usuario
    const [name, SetName] = useState('')
    const [avatar, SetLink] = useState('')
    const [whatsapp, SetWhatsapp] = useState('')
    const [bio, SetBio] = useState('')
    // Materia
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    async function HandleSubmitForm(e: MouseEvent) {
        e.preventDefault()
        try {
            await Api.post("/profy", ({
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                schedule
            }))
            alert("cadastro realizado")
            History.push("/")
        } catch(err) {
            alert("algum erro ocorreu")
            console.log({message: err});
        }
        
    }


    function HandleAddNewItem(e: MouseEvent) {
        e.preventDefault()
        setScheduleItem([...schedule, { week_day: 0, from: '', to: '' }])      
    }

    function HandleSetScheduleItem( position: number, field: string, value: string) {
        const newArr = schedule.map((schedule, index) => {
            if (index === position) {
                return {
                    ...schedule, [field]: value
                }
            }else { 
                return {...schedule} 
            }
        }) 

        
        setScheduleItem(newArr)
        console.log(schedule);
              
    }

    return (
        <div id="interface-formulario">
            <PageHeader text="Que incrivel que voce quer dar aulas" link="/">
                <div className="header-text">
                    <p>
                        O primeiro passo e preencher esse formulario de inscriçao
                    </p>
                </div>
                <form className="form-profy" >
                  <fieldset className="header-form">
                        <h3>Seus dados</h3>
                            <Input 
                                name="Nome completo" 
                                label="Nome"
                                onChange={e => SetName(e.target.value)}
                                value={name}
                            />

                            <Input 
                                name="Link da sua foto" 
                                label="foto"
                                onChange={e => SetLink(e.target.value)}
                                value={avatar}
                            >
                                <span>(comece com //http)</span>
                            </Input>

                            <Input 
                                name="whatsapp" 
                                label="whatsapp"
                                onChange={e => SetWhatsapp(e.target.value)}
                                value={whatsapp}    
                            >
                                <span>(somente números)</span>
                            </Input>

                            <Textarea 
                                label="biografia" 
                                name="biografia"
                                onChange={e => SetBio(e.target.value)}    
                                value={bio}
                            >
                            </Textarea>  
                    </fieldset>
                    <fieldset>
                            <h3>Sobre a aula</h3>
                            <Select 
                                label="materia" 
                                name="materia" 
                                value={subject}
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
                                ]
                            }/>
                        
                        <Input 
                            name="custo por hora de aula" 
                            label="custo"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        >          
                            <span>(em R$)</span>       
                        </Input> 
                    </fieldset>
                    <fieldset className="data">
                        <h3>Horarios disponiveis</h3>
                            <button className="add-time" onClick={HandleAddNewItem}>
                            + Adicionar horario
                            </button>
                            <hr id="linha"/>
                            {schedule.map((schedule, index) => {
                                return ( 
                                    <div id="schedule-item" key={index}>
                                        <Select 
                                            label="dia-da-semana" 
                                            name="dia da semana"
                                            onChange={e => HandleSetScheduleItem( index, 'week_day',  e.target.value )}                                            
                                            value={schedule.week_day}
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
                                            className="input-time" 
                                            name="das" 
                                            label="horario" 
                                            type="time" 
                                            value={schedule.from}
                                            onChange={e => HandleSetScheduleItem( index, 'from',  e.target.value )} 
                                            />
                                        <Input 
                                            className="input-time" 
                                            name="ate" 
                                            label="horario" 
                                            type="time" 
                                            value={schedule.to}
                                            onChange={e => HandleSetScheduleItem( index, 'to',  e.target.value )} 
                                            />
                                    </div>
                                );
                            })}
                    </fieldset>
                    <footer className="footer-profy">
                        <div className="elements">
                            <p>
                                <strong>Importante! Preencha todos os dados</strong>
                                <img src={warningIcon} alt="icone alerta svg"/>
                            </p>
                            <button 
                                type="submit" 
                                className="submit"
                                onClick={HandleSubmitForm}    
                            >
                                Salvar Cadastro
                            </button>
                        </div>
                    </footer>
                </form>
            </PageHeader>
      
           
        </div>
    )
}