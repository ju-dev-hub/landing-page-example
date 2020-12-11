import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

class LeadResume extends Component {

    render() {
        if (this.props.coverage && this.props.productValue) {

            const coverage = this.props.coverage
            const productValue = this.props.productValue

            const housePlanName = coverage.substr(0, coverage.indexOf("CASA"))
            const housePlanType = coverage.substring(coverage.indexOf("CASA")).replace(/CASA /, housePlanName)
            const aptoPlanName = coverage.substr(0, coverage.indexOf("APARTAMENTO"))
            const aptoPlanType = coverage.substring(coverage.indexOf("APARTAMENTO")).replace(/APARTAMENTO /, aptoPlanName)

            return (
                <div className="row justify-content-center d-flex align-items-center">
                    <div className="lead-resume container-fluid col-10 col-sm-8">
                        <div className="row justify-content-center d-flex align-items-center">
                            <span className="lead-name">{this.props.name}</span>
                        </div>
                        <div className="row justify-content-center d-flex align-items-center">
                            <span className="lead-plan">Você está contratando o plano: <span className="secondWord">{coverage.indexOf("CASA") > 0 ? housePlanType.toUpperCase() : aptoPlanType.toUpperCase()}</span><span className="fristWord">{coverage.indexOf("CASA") > 0 ? housePlanName.toUpperCase() : aptoPlanName.toUpperCase()}</span></span></div>
                        <div className="row justify-content-center lead-plan-value">
                            <span className="lead-parcel">Valor do seu plano: </span>
                            <span className="lead-value">10x de R${productValue ? (productValue / 10).toFixed(2).toString().replace(".", ",") : null}</span>
                            <span className="lead-total">Total: R${productValue ? productValue.toFixed(2).toString().replace(".", ",") : null}</span>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null
        }
    }
}

export default LeadResume