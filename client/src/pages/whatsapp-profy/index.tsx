import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Api from '../../services/api';
import './index.css'

const ProfyWhatsapp: React.FC = () => {
    
    const {id} = useParams()
    const [whatsappNumber, setWhatsappNumber] = useState('')
    
    useEffect(() => {
        async function getProfy () {
            try {
                const {data} = await Api.get(`/profy/${id}`)
                const profy = data.response[0]
                setWhatsappNumber(profy.whatsapp)
            } catch (err) {
                setWhatsappNumber("Erro professor nao encontrado")
            } 
        }   
        getProfy()
    })
   

    return (
        <div className="whatsapp-profy">
            <main className="profy">
                Entre em contato pelo numero: 
                <label htmlFor="whatsapp" className="text-whatsapp">
                {whatsappNumber}
                </label>
            </main>
        </div>
    );
}
export default ProfyWhatsapp