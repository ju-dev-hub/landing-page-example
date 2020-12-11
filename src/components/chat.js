import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'

//Import Images
import aptoEssencial from '../img/card-apto-essencial.png'
import aptoIntegral from '../img/card-apto-integral.png'
import aptoPleno from '../img/card-apto-pleno.png'
import csEssencial from '../img/card-casa-essencial.png'
import csIntegral from '../img/card-casa-integral.png'
import csPleno from '../img/card-casa-pleno.png'
import csApto01 from '../img/casa-ou-apto01.png'
import csApto02 from '../img/casa-ou-apto02.png'
import coberturaAptoEssencial from '../img/card-segureai-cobertura-apto-essencial-300xinfinito.png'
import coberturaAptoIntegral from '../img/card-segureai-cobertura-apto-integral-300xinfinito.png'
import coberturaAptoPleno from '../img/card-segureai-cobertura-apto-pleno-300xinfinito.png'
import coberturacsEssencial from '../img/card-segureai-cobertura-casa-essencial-300xinfinito.png'
import coberturacsIntegral from '../img/card-segureai-cobertura-casa-integral-300xinfinito.png'
import coberturacsPleno from '../img/card-segureai-cobertura-casa-pleno-300xinfinito.png'
import topplus from '../img/card-segureai-topplus-300xinfinito.png'

import mailImage from '../img/Ativo-1.png'
import mailFacebook from '../img/Facebook.png'
import mailImage2 from '../img/foto-email-2.png'
import mailInstagram from '../img/Instagram.png'
import mailWebsite from '../img/Website.png'

class ChatImages extends Component {

    render() {
        return (
            <div className="chat-images">
                <img src={aptoEssencial} alt="aptoEssencial" />
                <img src={aptoIntegral} alt="aptoIntegral" />
                <img src={aptoPleno} alt="aptoPleno" />
                <img src={csEssencial} alt="csEssencial" />
                <img src={csIntegral} alt="csIntegral" />
                <img src={csPleno} alt="csPleno" />
                <img src={csApto01} alt="csApto01" />
                <img src={csApto02} alt="csApto02" />
                <img src={coberturaAptoEssencial} alt="coberturaAptoEssencial" />
                <img src={coberturaAptoIntegral} alt="coberturaAptoIntegral" />
                <img src={coberturaAptoPleno} alt="coberturaAptoPleno" />
                <img src={coberturacsEssencial} alt="coberturacsEssencial" />
                <img src={coberturacsIntegral} alt="coberturacsIntegral" />
                <img src={coberturacsPleno} alt="coberturacsPleno" />
                <img src={topplus} alt="topplus" />
                {/* Mail images */}
                <img src={mailImage} alt="mailImage" />
                <img src={mailFacebook} alt="mailFacebook" />
                <img src={mailImage2} alt="mailImage2" />
                <img src={mailInstagram} alt="mailInstagram" />
                <img src={mailWebsite} alt="mailWebsite" />
            </div>
        )
    }
}

export default ChatImages
