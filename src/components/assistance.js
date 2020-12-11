import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

//Import Images
import check from '../img/check.svg'
import fire from '../img/fire.svg'
import shock from '../img/shock.svg'
import plug from '../img/plug.svg'
import ninja from '../img/ninja.svg'
import rain from '../img/rain.svg'
import window from '../img/window.svg'
import lightning from '../img/lightning.svg'
import file from '../img/file.svg'

class Assistance extends Component {

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-7 col-md-7 col-sm-12 col-12 text-center">
                        <p className="assistance-title">Sua casa protegida por um seguro residencial completo</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-7 col-md-7 col-sm-12 col-12 text-center">
                        <p className="assistance-subtitle">Conte com a comodidade do <strong>seguro residencial online</strong> da segure.ai para manter sua residência protegida <strong>24 Horas por dia</strong>. Além de uma das maiores coberturas do mercado, o processo de acionamento é <strong>rápido e feito por profissionais qualificados</strong>.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="assistance-red-box text-center bg-red red col-xl-2 col-lg-2">
                            <img className="assistance-icon col-12" src={fire} alt="Serviço de chaveiro" />
                            <strong>Incêndio</strong>
                            <div className="col-12">
                                Danos materiais por incêndio, combustão ou fumaça.
                                </div>
                        </div>
                        <div className="assistance-red-box text-center bg-red-strong red col-xl-2 col-lg-2">
                            <img className="assistance-icon col-12" src={lightning} alt="Serviço de chaveiro" />
                            <strong>Queda de raio</strong>
                            <div className="col-12">
                                Danos as instalações e bens causado por queda de raios.
                                </div>
                        </div>
                        <div className="assistance-red-box text-center bg-red red col-xl-2 col-lg-2">
                            <img className="assistance-icon col-12" src={plug} alt="Serviço de chaveiro" />
                            <strong>Danos elétricos</strong>
                            <div className="col-12">
                                Em caso de danos a instalações, bens e eletrodomésticos.
                                </div>
                        </div>
                        <div className="assistance-red-box text-center bg-red-medium red col-xl-2 col-lg-2">
                            <img className="assistance-icon col-12" src={ninja} alt="Serviço de chaveiro" />
                            <strong>Roubo ou Furto</strong>
                            <div className="col-12">
                                Furto ou roubo de bens, roupas ou eletrônicos na residência.</div>
                        </div>
                        <div className="assistance-red-box text-center bg-red-strong red col-xl-2 col-lg-2">
                            <img className="assistance-icon col-12" src={rain} alt="Serviço de chaveiro" />
                            <strong>Vendaval e Granizo</strong>
                            <div className="col-12">
                                Prejuízos causados a residência em decorrência de causas naturais.</div>
                        </div>
                        <div className="assistance-red-box text-center bg-red-medium col-xl-4 col-lg-4">
                            <img className="assistance-icon col-12" src={shock} alt="Serviço de chaveiro" />
                            <strong>Explosão</strong>
                            <div className="col-12">
                                De qualquer natureza, interno ou externo que venha a causar prejuízo ao segurado.</div>
                        </div>
                        <div className="assistance-red-box text-center bg-red-strong col-xl-4 col-lg-4">
                            <img className="assistance-icon col-12" src={window} alt="Serviço de chaveiro" />
                            <strong>Quebra de vidros</strong>
                            <div className="col-12">
                                Reparos de vidros fixados na estrutura do imóvel (janelas, portas e espelhos).</div>
                        </div>
                        <div className="assistance-red-box text-center bg-red col-xl-4 col-lg-4">
                            <img className="col-12 assistance-icon" src={file} alt="Serviço de chaveiro" />
                            <strong>Responsabilidade civil familiar</strong>
                            <div className="col-12" >
                                Pagamento das despesas, inclusive indenizações que possam ser cobradas judicialmente.
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="horizontal-line"></div>
                        <div className="row justify-content-center">
                            <div className="col-8 col-md-8 col-sm-12 col-12 text-center">
                                <div className="assistance-title">Assistência 24h para não ficar na mão com os imprevistos do dia a dia</div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-8 col-md-8 col-sm-12 col-12 text-center">
                                <div className="assistance-subtitle">Conte com a nossa <strong>completa assistência</strong>, basta entrar em contato com a segure.ai e em pouco tempo um <strong>profissional seguro e qualificado</strong> resolve o problema sem qualquer custo adicional.</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3 assistance-check">
                                <div className="row justify-content-center">
                                    <img className="col-12 logo-check" src={check} alt="Serviço de chaveiro" />
                                    <strong className="assistance-check-text">Serviço de chaveiro</strong>
                                </div>
                            </div>
                            <div className="col-3 assistance-check">
                                <div className="row justify-content-center">
                                    <img className="col-12 logo-check" src={check} alt="Serviço de encanador" />
                                    <strong className="assistance-check-text">Serviço de encanador</strong>
                                </div>
                            </div>
                            <div className="col-3 assistance-check">
                                <div className="row justify-content-center">
                                    <img className="col-12 logo-check" src={check} alt="Serviço de eletricista" />
                                    <strong className="assistance-check-text">  Serviço de eletricista</strong>
                                </div>
                            </div>
                            <div className="col-3 assistance-check">
                                <div className="row justify-content-center">
                                    <img className="col-12 logo-check" src={check} alt="Serviço de vidraceiro" />
                                    <strong className="assistance-check-text">Serviço de vidraceiro</strong>
                                </div>
                            </div>
                            <div className="col-3 assistance-check">
                                <div className="row justify-content-center">
                                    <img className=" col-12 logo-check" src={check} alt="Serviço de desentupimento" />
                                    <strong className="assistance-check-text">Serviço de desentupimento</strong>
                                </div>
                            </div>
                            <div className="col-3 assistance-check">
                                <div className="row justify-content-center">
                                    <img className="col-12 logo-check" src={check} alt="Conserto de eletrodomésticos" />
                                    <strong className="assistance-check-text">Conserto de eletrodomésticos</strong>
                                </div>
                            </div>
                            <div className="col-3 assistance-check">
                                <div className="row justify-content-center">
                                    <img className="col-12 logo-check" src={check} alt="Assistência residencial" />
                                    <strong className="assistance-check-text">Assistência residencial</strong>
                                </div>
                            </div>
                            <div className="col-3 assistance-check">
                                <div className="row justify-content-center">
                                    <img className="col-12 logo-check" src={check} alt="Cobertura provisória de telhados" />
                                    <strong className="assistance-check-text">Cobertura provisória de telhados</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center assistance-btn-cotation">
                            <a href="#form-red-box">
                                <button className="assistance-button" type="button" id="btnAssistence">
                                    FAÇA SUA COTAÇÃO AGORA MESMO
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Assistance
