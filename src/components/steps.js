import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

class Steps extends Component {

    constructor(props) {
        super(props)
        this.state = {
            coverage: `/contract/coverage/2/${this.props.id}`,
            details: `/form/details/3/${this.props.id}`,
            address: `/form/address/4/${this.props.id}`,
            payment: `/checkout/payment/5/${this.props.id}`
        }
    }

    render() {
        return (
            <div className="steps container-fluid col-11 col-sm-10">
                <ul className="nav justify-content-center">
                    <li className="nav-item justify-content-center d-flex align-items-center">
                        <Link className={this.props.step === 3 ? "nav-link nav-active" : "nav-link"} aria-selected={this.props.stepDisabled === "coverage" || this.props.stepDisabled === "details" || this.props.stepDisabled === "address" || this.props.stepDisabled === "payment" ? true : false} to={this.state.coverage}>Planos</Link>
                    </li>
                    <li className="nav-item justify-content-center d-flex align-items-center">
                        <Link className={this.props.step === 4 ? "nav-link nav-active" : "nav-link"} aria-selected={this.props.stepDisabled === "details" || this.props.stepDisabled === "address" || this.props.stepDisabled === "payment" ? true : false} to={this.state.details}>Dados</Link>
                    </li>
                    <li className="nav-item justify-content-center d-flex align-items-center">
                        <Link className={this.props.step === 5 ? "nav-link nav-active" : "nav-link"} aria-selected={this.props.stepDisabled === "address" || this.props.stepDisabled === "payment" ? true : false} to={this.state.address}>Endereço</Link>
                    </li>
                    <li className="nav-item justify-content-center d-flex align-items-center">
                        <Link className={this.props.step === 6 ? "nav-link nav-active" : "nav-link"} aria-selected={this.props.stepDisabled === "payment" ? true : false} to={this.state.payment}>Pagamento</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Steps