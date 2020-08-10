import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

import Api from '../../services/api'

import ImageLanding from '../../assets/images/landing.svg'
import ImageLogo from '../../assets/images/logo.svg'

import StudyIcon from '../../assets/images/icons/study.svg'
import GiveClassesIcon from '../../assets/images/icons/give-classes.svg'
import PurpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import './home.css'

function HomePage () {


    const [connections, setConnections] = useState(0)

    useEffect(() => {
        async function getNumber() {
            const response = await Api.get("/connection")
            setConnections(response.data.data.total)
            
        }
        getNumber()
    })

    return (
        <div id="home-page">
            <figure className="landing-home" id="landing">
                <img src={ImageLanding} alt="landing-profy" className="landing-profy-"/>
            </figure>
            <figure className="logo-home" id="logo">
                <img src={ImageLogo} alt="logo-profy" className="logo-profy" id=""/>
                <figcaption className="logo-home-caption">
                    <h2>
                        Sua plataforma de estudos online
                    </h2>
                </figcaption>
            </figure>

            <nav className="menu-home">
                <ul className="list-home">
                    <li>
                        <Link to="/profy" id="estudar-button" className="button-home">
                            <figure className="icon-study">
                                <img src={StudyIcon} alt="study-icon-svg"/>
                                    <figcaption className="caption" >
                                        <span>Estudar</span>
                                    </figcaption>
                            </figure>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profy/form" id="dar-aulas-button" className="button-home">
                            <figure className="give-classes-icon">
                                <img src={GiveClassesIcon} alt="give-classes-icon"/>
                                    <figcaption className="caption">
                                        <span >Dar aulas</span>
                                    </figcaption>
                            </figure>
                        </Link>
                    </li>
                </ul>
            </nav>
            <span className="connection-span">
                <figure>
                    <img src={PurpleHeartIcon} alt="purple-heart"/>
                    <figcaption>
                        Mais de {connections} conexoes realizadas
                    </figcaption>
                </figure>
            </span>
        </div>
    )
}

export default HomePage