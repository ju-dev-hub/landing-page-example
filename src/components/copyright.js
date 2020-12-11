import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import cardIcons from '../img/cartoes.svg'

class Copyright extends Component {

    render() {
        return (
            <div className="row justify-content-center d-flex align-items-center">
                <div className="col-12 copyright-text">
                    <span>A <a href="/">segure.ai</a> é uma plataforma de venda de seguros online Parceira da BATATA | Os produtos comercializados neste site são garantidos por ela.<br />
                        BATATA Seguros Gerais S.A. CNPJ: 61.074.175/0001-38 - Residencial - nº15414.004192/2004-71 e nº15414.001935/2010-07 | O registro deste plano na SUSEP não implica, por parte da Autarquia, incentivo ou recomendação a sua comercialização | <a href="https://www.batata.com.br/seguro-br/para-voce/imoveis/seguro-imovel/residencial/condicoes.jsp" rel="noopener noreferrer" target="blank">Condições Gerais</a><br />
                        © 2019 <a href="/">segure.ai</a> - Todos os direitos reservados.
                    </span>
                </div>
                <div className="col-12 copyright-icons">
                    <img className="copyright-cards" src={cardIcons} alt="Ícones de Cartões de Crédito" />
                </div>
            </div>
        )
    }
}

export default Copyright