import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import HomePage from './pages/home-page/home';
import profysForm from './pages/register-profy/index'
import profys from './pages/profys-list/index'
import ProfyWhatsapp from './pages/whatsapp-profy';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" component={HomePage} exact/>
            <Route path="/profy/form" component={profysForm} exact/>
            <Route path="/profy" component={profys} exact/>
            <Route path="/profy/whatsapp/:id" component={ProfyWhatsapp} exact/>
        </BrowserRouter>
    ) 
}