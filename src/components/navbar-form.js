import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import segureAi from '../img/segureAi.svg'

class NavbarForm extends Component {

    render() {
        return (
            <nav className='navbar-form justify-content-center d-flex align-items-center' >
                {
                    localStorage && localStorage.operatorId ?
                        <div className="row">
                            <div className="col-10 logout-logo">
                                <Link to="/operador">
                                    <img className="navbar-logo-form" src={segureAi} alt="Logo da segure.ai" />
                                </Link>
                            </div>
                            <div className="col-2 logout-form">
                                <div className="row">
                                    <div className="buttonNav-logout">
                                        <div className="col">
                                            {localStorage && localStorage.operatorName ? localStorage.operatorName.substr(0, localStorage.operatorName.indexOf(" ")) : ''}
                                        </div>
                                        <div className="col">
                                            segure.ai
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <Link to="/">
                            <img className="navbar-logo-form" src={segureAi} alt="Logo da segure.ai" />
                        </Link>
                }
            </nav>
        )
    }
}

export default NavbarForm
