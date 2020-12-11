import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import whatsappIcon from '../img/whatsapp-chat.png'

class WhatsappChat extends Component {

    render() {
        return (
            <div className="whatsapp-container">
                <a href="https://api.whatsapp.com/send?1=pt_BR&phone=551140001558&text=oi" rel="noopener noreferrer" target="blank">
                    <img className="whatsapp-icon" src={whatsappIcon} alt="Icone do whatsapp" />
                </a>
            </div>
        )
    }
}

export default WhatsappChat