import React, { Component } from 'react'
import { Collapse } from 'reactstrap'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            faqA: false,
            faqB: false,
            faqC: false,
            faqD: false,
            faqE: false,
        }
    }

    render() {

        const { faqA, faqB, faqC, faqD, faqE } = this.state

        return (
            <div id="bg-help">
                <div className="container help">
                    <div className="row justify-content-center d-flex align-items-center">
                        <div className="col-sm-12 col-11">
                            <p className="help-title">Ainda tem dúvidas?</p>
                            <p className="help-subtitle">Separamos as principais perguntas dos nossos clientes para você.</p>
                        </div>
                        <div className="row">
                            <div className="help-collapse" onClick={() => this.setState({ faqE: !faqE })} >
                                <div className="help-collapse-text">
                                    Quanto tempo dura a apólice?
                                </div>
                                <div className="help-red-arrow" id="help-collapse-text"
                                    aria-controls="help-collapse-text"
                                    aria-expanded={faqE}>
                                </div>
                                <Collapse isOpen={faqE}>
                                    <div id="help-collapse-text">
                                        A apólice dura um ano a partir da data de contratação.
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="row">
                            <div className="help-collapse" onClick={() => this.setState({ faqA: !faqA })} >
                                <div className="help-collapse-text">
                                    Como funciona o seguro residencial?
                                </div>
                                <div className="help-red-arrow" id="help-collapse-text"
                                    aria-controls="help-collapse-text"
                                    aria-expanded={faqA}>
                                </div>
                                <Collapse isOpen={faqA}>
                                    <div id="help-collapse-text">
                                        O seguro residencial protege o seu patrimônio. Não só a estrutura física da sua residência, mas também, tudo o que está dentro dela (televisão, móveis, infraestrutura elétrica, entre outros). Ao escolher qual plano é mais adequado para você e sua residência, é importante levar isso em conta.
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="row">
                            <div className="help-collapse" onClick={() => this.setState({ faqB: !faqB })}>
                                <div className="help-collapse-text">
                                    Como funciona a contratação?
                                </div>
                                <div className="help-red-arrow" id="help-collapse-text"
                                    aria-controls="help-collapse-text"
                                    aria-expanded={faqB}>
                                </div>
                                <Collapse isOpen={faqB}>
                                    <div id="help-collapse-text">
                                        Os planos têm vigência de 12 meses e o valor integral pode ser parcelado em até 10x sem juros no débito automático e no cartão de crédito.
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="row">
                            <div className="help-collapse" onClick={() => this.setState({ faqC: !faqC })}>
                                <div className="help-collapse-text">
                                    Como funcionam as assistências?
                                </div>
                                <div className="help-red-arrow" id="help-collapse-text"
                                    aria-controls="help-collapse-text"
                                    aria-expanded={faqC}>
                                </div>
                                <Collapse isOpen={faqC}>
                                    <div id="help-collapse-text">
                                        As assistências podem ser acionadas a qualquer momento, para cada assistência existem limites de acionamento e valores para o período da vigência do contrato.
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                        <div className="row">
                            <div className="help-collapse" onClick={() => this.setState({ faqD: !faqD })}>
                                <div className="help-collapse-text">
                                    Posso contratar para o imóvel alugado?
                                </div>
                                <div className="help-red-arrow" id="help-collapse-text"
                                    aria-controls="help-collapse-text"
                                    aria-expanded={faqD}>
                                </div>
                                <Collapse isOpen={faqD}>
                                    <div id="help-collapse-text">
                                        Sim, você pode. Apartamentos alugados geralmente exigem a contratação de seguros contra incêndio, acontece que esse seguro cobrem as áreas comuns do prédio e não o interior do apartamento. Contratando nosso seguro residencial, você conta com a comodidade das assistências e coberturas que não protege só o imóvel, mas também seus bens no interior.
                                    </div>
                                </Collapse>
                            </div>
                        </div>

                        <div className="row about-btn-cotation help">
                            <div className="col-12">
                                <a href="#form-red-box">
                                    <button id="btnHelp" className="about-button" type="button">
                                        FAÇA SUA COTAÇÃO AGORA MESMO
                            </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help
