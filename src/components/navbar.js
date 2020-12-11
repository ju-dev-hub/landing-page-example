import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/modal'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import segureAi from '../img/segureAi.svg'
import whatsappIcon from '../img/whatsapp-navbar.png'

class NavbarClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: localStorage.operatorName && localStorage.operatorId ? false : true
        }
    }

    singOut() {
        localStorage.operatorName = ''
        localStorage.operatorId = ''
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    render() {
        return (
            <nav className="navbar col-lg-12">
                <div className="container">
                    <div className="row navbar-logo">
                        {
                            window.location.pathname === "/" ?
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                                    <Link to="/">
                                        <img className="logo" src={segureAi} alt="Logo da segure.ai" />
                                    </Link>
                                </div> :
                                <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                                    <Link to="/operador">
                                        <img className="logo" src={segureAi} alt="Logo da segure.ai" />
                                    </Link>
                                </div>
                        }
                        {
                            window.location.pathname === "/" ?
                                <div className="col-6">
                                    <div id="buttonNavId">
                                        <a className='buttonNav' href="https://api.whatsapp.com/send?1=pt_BR&phone=551140001558&text=Quero%20saber%20mais" rel="noopener noreferrer" target="blank">
                                            <img className="whatsapp-navbar" src={whatsappIcon} alt="Icone do whatsapp"></img>
                                            COTAÇÃO VIA WHATSAPP
                                        </a>
                                    </div>
                                </div>
                                : null
                        }
                        {
                            window.location.pathname === "/operador" ?
                                <div className="col logout">
                                    <div className="row">
                                        <div className="col-6 buttonNav-logout">
                                            <div className="col">
                                                {localStorage && localStorage.operatorName ? localStorage.operatorName.substr(0, localStorage.operatorName.indexOf(" ")) : ''}
                                            </div>
                                            <div className="col">
                                                segure.ai
                                            </div>
                                        </div>
                                        <div className="col-6 btn-logout">
                                            <button id="buttonNavId" type="button" className='buttonNav-logout' onClick={this.singOut.bind(this)}>Sair</button>
                                        </div>
                                    </div>
                                    <Modal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} />
                                </div>
                                : null
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavbarClass
