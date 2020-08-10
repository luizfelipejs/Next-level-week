import React from 'react';
import {Link} from 'react-router-dom'

import Logo from '../../assets/images/logo.svg'
import backImageSvg from '../../assets/images/icons/back.svg'
import './index.css'

interface propSchema { 
    text: string
    link: string
}

const Header: React.FC<propSchema> = (props) => {  
    return (
        <>    
            <header className="header-profy">
                <nav className="menu-profy">
                    <Link to={props.link}>
                        <img src={backImageSvg} alt="voltar-home" className="img-header"/>
                    </Link>
                        </nav>
                        <img src={Logo} alt="logo-profy" className="img-header" id="logo-header"/>
                        <h2 className="title-profy">
                            {props.text}
                        </h2>
            </header>
            {props.children}
        </>
    )      
}

export default Header