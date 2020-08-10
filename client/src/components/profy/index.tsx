import React from 'react';
import {Link} from  'react-router-dom'
import './index.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
interface propSchema {
    linkFoto: string
    nome: string
    biografia: string
    preço: string
    materia: string
    id: string
}


const profy: React.FC<propSchema> =  (props) => {
    return (
    <li className="profy">
                <div className="profile-description">
                    <div className="avatar">
                        <img src={props.linkFoto} alt="profy" className="profy-photo"/>
                        <h1 className="title-profy">
                            {props.nome}
                        </h1>
                        <span className="subject">
                            {props.materia}
                        </span>
                    </div>
                    <p className="bio-profy">
                        {props.biografia}
                    </p>            
                    <footer className="down">
                        <span className="price-profy">
                            preço/hora 
                        </span>
                        <h2>{props.preço}</h2>
                        <Link to={`/profy/whatsapp/${props.id}`} className="whatsapp">
                            <img src={whatsappIcon} alt="whatsapp"/>
                        <span>Entrar em contato</span></Link>
                </footer>
        </div>
    </li>
    )
}
export default profy