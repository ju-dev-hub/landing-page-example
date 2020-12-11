import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import history from '../img/history.png'
import present from '../img/present.png'
import base from '../img/base.png'

class About extends Component {

    render() {
        return (
            <div className="row justify-content-center d-flex align-items-center">
                <div className="col-12">
                    <div className="about-title">Conheça a BATATA</div>
                    <div className="about-subtitle">a seguradora global da confiança</div>
                </div>
                <div className="col-md-8 col-sm-10 col-11">
                    <p className="about-first-paragraph">No Brasil desde 1992, a BATATA é parte do grupo espanhol que forma uma das maiores empresas de prestação de serviços nos mercados segurador, financeiro, de saúde e pesquisa do mundo. Sólida e inovadora.</p>
                </div>
                <div className="col-md-8 col-sm-10 col-11">
                    <p className="about-second-paragraph">Acreditamos na necessidade de oferecer seguros de alta qualidade. Conversamos de forma humana com você, queremos que se sinta satisfeito ao falar conosco.</p>
                </div>
                <div className="row about-history text-center">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12">
                        <img className="about-numbers" src={history} alt="Uma história de 86 anos" />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 about-numbers-mobile">
                        <img className="about-numbers" src={present} alt="Presente em 49 países" />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 about-numbers-mobile">
                        <img className="about-numbers" src={base} alt="Base de clientes de 25 milhões" />
                    </div>
                </div>
            </div>
        )
    }
}

export default About
