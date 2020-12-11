import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'
import Teste from '../img/card-casa-pleno.png'

class Mail extends Component {

    render() {
        return (
            <div>
                <h1>EMAIL TESTE</h1>
                <img src={Teste} alt="teste"></img>
            </div>
        )
    }
}

export default Mail