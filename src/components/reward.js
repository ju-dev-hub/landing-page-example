import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import images
import seven from '../img/seven.png'

class Reward extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-6" id="background-family"></div>
                <div className="row col-12 col-md-6 col-sm-12 reward-text-box">
                    <p className="col-lg-8 col-md-8 col-12 reward-title">Concorra todo mês a um prêmio de:
                    </p>
                    <div className="col-12 col-lg-4 col-md-4 reward">
                        <img className="reward-image" src={seven} alt="7 mil reais" />
                    </div>
                    <p className="col-12 reward-text">Além de contar com a tradição de uma das maiores seguradoras do mundo, clientes da segure.ai usufruem de todos os benefícios da BATATA residencial e ainda concorrem em sorteios de 7 mil reais todo mês. Os sorteios são realizados durante a vigência da apólice, pela Loteria Federal do Brasil, no último sábado de cada mês.</p>
                    <div className="col-12">
                        <div className="reward-line"></div>
                    </div>
                    <p className="col-12 reward-subtitle">Clube de Compras e Rede de Conveniência</p>
                    <p className="col-12 reward-text-club">
                        Com o Clube de Compras, você tem acesso aos melhores produtos e serviços com descontos especiais.
                        </p>
                    <p className="col-12 reward-club">
                        Já na Rede de Conveniência, você encontra os parceiros da BATATA. São as maiores redes do Brasil, oferecendo descontos exclusivos para nossos clientes.
                        </p>
                    <a className="col-12 reward-link" href="https://www.batata.com.br/seguro-br/servicos/area-do-cliente/beneficios/clube-de-compras/shopping.jsp" rel="noopener noreferrer" target="_blank">Ver redes conveniadas</a>
                </div>
            </div>
        )
    }
}

export default Reward
