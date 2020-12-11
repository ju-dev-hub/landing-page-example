import React, { Component } from 'react'
// import ReactTooltip from 'react-tooltip'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import star from '../img/star_yellow.svg'

class PlusAssistance extends Component {

    render() {
        return (
            <div className="assistence-plus ">
                <div className="row">
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="row">
                            <img className="star" src={star} alt="Ícone de uma estrela" />
                            <div className="assistence-plus-title" data-tip='custom show' data-for='vigia' data-event='click focus'>Serviço de vigia</div>
                            {/* <ReactTooltip id='vigia' globalEventOff='click'>
                                <div className="plus-title">
                                    <span>Serviço de vigia</span>
                                </div>
                                <div className="plus-subtitle">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </div>
                            </ReactTooltip> */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="row">
                            <img className="star" src={star} alt="Ícone de uma estrela" />
                            <div className="assistence-plus-title" data-tip='custom show' data-for='eletricista' data-event='click focus'>Serviço de eletricista</div>
                            {/* <ReactTooltip id='eletricista' globalEventOff='click'>
                                <div className="plus-title">
                                    <span>Serviço de eletricista</span>
                                </div>
                                <div className="plus-subtitle">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </div>
                            </ReactTooltip> */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="row">
                            <img className="star" src={star} alt="Ícone de uma estrela" />
                            <div className="assistence-plus-title" data-tip='custom show' data-for='encanador' data-event='click focus'>Serviço de encanador</div>
                            {/* <ReactTooltip id='encanador' globalEventOff='click'>
                                <div className="plus-title">
                                    <span>Serviço de encanador</span>
                                </div>
                                <div className="plus-subtitle">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </div>
                            </ReactTooltip> */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="row">
                            <img className="star" src={star} alt="Ícone de uma estrela" />
                            <div className="assistence-plus-title" data-tip='custom show' data-for='manutencao' data-event='click focus'>Manutenção de eletrodomésticos</div>
                            {/* <ReactTooltip id="manutencao" globalEventOff='click'>
                                <div className="plus-title">
                                    <span>Manutenção de eletrodomésticos</span>
                                </div>
                                <div className="plus-subtitle">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </div>
                            </ReactTooltip> */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="row">
                            <img className="star" src={star} alt="Ícone de uma estrela" />
                            <div className="assistence-plus-title" data-tip='custom show' data-for='chaveiro' data-event='click focus'>Serviço de chaveiro</div>
                            {/* <ReactTooltip id="chaveiro" globalEventOff='click'>
                                <div className="plus-title">
                                    <span>Serviço de chaveiro</span>
                                </div>
                                <div className="plus-subtitle">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </div>
                            </ReactTooltip> */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="row">
                            <img className="star" src={star} alt="Ícone de uma estrela" />
                            <div className="assistence-plus-title" data-tip='custom show' data-for='vidraceiro' data-event='click focus'>Serviço de vidraceiro</div>
                            {/* <ReactTooltip id="vidraceiro" globalEventOff='click'>
                                <div className="plus-title">
                                    <span>Serviço de vidraceiro</span>
                                </div>
                                <div className="plus-subtitle">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </div>
                            </ReactTooltip> */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="row">
                            <img className="star" src={star} alt="Ícone de uma estrela" />
                            <div className="assistence-plus-title" data-tip='custom show' data-for='desentupimento' data-event='click focus'>Serviço de desentupimento</div>
                            {/* <ReactTooltip id='desentupimento' globalEventOff='click'>
                                <div className="plus-title">
                                    <span>Serviço de desentupimento</span>
                                </div>
                                <div className="plus-subtitle">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </div>
                            </ReactTooltip> */}
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4 col-xl-3">
                        <div className="row">
                            <img className="star" src={star} alt="Ícone de uma estrela" />
                            <div className="assistence-plus-title" data-tip='custom show' data-for='suporte' data-event='click focus'>Manutenção e suporte residencial</div>
                            {/* <ReactTooltip id='suporte' globalEventOff='click'>
                                <div className="plus-title">
                                    <span>Manutenção e suporte residencial</span>
                                </div>
                                <div className="plus-subtitle">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </div>
                            </ReactTooltip> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlusAssistance