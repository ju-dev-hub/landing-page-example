import React, { Component } from 'react'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import star from '../img/star_yellow.svg'
import openCollapse from '../img/open-collapse.svg'
import arrow from '../img/arrow-grey-down.svg'

// Import Component
import CollapseResumePayment from '../components/payment-collapse'

class PaymentResume extends Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.openCollapse = this.openCollapse.bind(this)

        this.state = {
            leadPlanParcel: '',
            leadPlanTotal: '',
            products: [],
            planName: '',
            planType: '',
            parcel: '10',
            collapse: false,
        }

    }

    UNSAFE_componentWillMount() {
        this.formatText()
        this.formatValue()
    }

    formatValue = () => {
        if (this.props.productValue) {
            const leadPlanTotal = this.props.productValue.toFixed(2).toString().replace('.', ',')

            this.setState({ leadPlanTotal: leadPlanTotal })
        } else {
            this.setState({ leadPlanTotal: '' })
        }
    }

    formatText = () => {
        if (this.props.coverage && this.props.coverage.indexOf('CASA') > 0) {
            const planName = this.props.coverage.substr(0, this.props.coverage.indexOf('CASA'))
            const planType = this.props.coverage.substring(this.props.coverage.indexOf('CASA')).replace(/CASA /, planName)

            this.setState({ planName: planName, planType: planType })

        }
        else if (this.props.coverage && this.props.coverage.indexOf('APARTAMENTO') > 0) {
            const planName = this.props.coverage.substr(0, this.props.coverage.indexOf('APARTAMENTO'))
            const planType = this.props.coverage.substring(this.props.coverage.indexOf('APARTAMENTO')).replace(/APARTAMENTO /, planName)

            this.setState({ planName: planName, planType: planType })
        }
        else {
            this.setState({ planName: '', planType: '' })
        }
    }

    openCollapse(openCollapse) {
        this.setState({
            collapse: openCollapse
        })
    }

    handleChange(event) {
        const text = event.target.value
        this.props.onChange(text)
    }

    render() {
        return (
            <div>
                {/* DESKTOP */}
                <div className="payment-resume-desktop" >
                    <div className="payment-resume justify-content-center d-flex align-items-center">
                        <div className="row justify-content-center">
                            <div className="col-4 resume-box">
                                <div className="payment-img" onClick={() => this.setState({ collapse: !this.state.collapse })}>
                                    <span className="coverage-plan">Plano <span className="secondWord">{this.state.planType.toUpperCase()}</span><img className="plan-resume" src={openCollapse} alt="Resumo do seu plano" /></span>
                                </div>
                                <div>
                                    <img src={star} alt="Estrela amarela" />
                                    <span className="coverage-resume">Cobertura {this.state.planName}</span>
                                </div>
                                <div>
                                    <img src={star} alt="Estrela amarela" />
                                    <span className="coverage-resume">Assistência TOP PLUS</span>
                                </div>
                                <CollapseResumePayment collapseData={this.props.collapseData} collapse={this.state.collapse} openCollapse={this.openCollapse} parcel={this.props.parcel} price={(this.props.productValue / parseInt(this.props.parcel)).toFixed(2).toString().replace(".", ",")}></CollapseResumePayment>
                            </div>
                            <div className="col-4 resume-box resume-value">
                                <div className="row justify-content-center">
                                    <span className="resume-parcel">{this.props.parcel}</span><span className="resume-price">x de R$</span><span className="resume-parcel">{(this.props.productValue / parseInt(this.props.parcel)).toFixed(2).toString().replace(".", ",")}</span>
                                </div>
                                <div className="row justify-content-center lead-plan-value">
                                    <span className="resume-total">Valor total de sua contratação: R${this.state.leadPlanTotal}</span>
                                </div>
                            </div>
                            <div className="col-4 resume-value">
                                <div className="number-parcel">
                                    Número de parcelas: {this.props.parcel}
                                </div>
                                <div className="input-group-prepend row justify-content-center d-flex align-items-center">
                                    <input id="parcel_1" type="button" className={this.props.parcel === "1" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="1" placeholder="1" disabled={this.props.hasSale}></input>
                                    <input id="parcel_2" type="button" className={this.props.parcel === "2" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="2" placeholder="2" disabled={this.props.hasSale}></input>
                                    <input id="parcel_4" type="button" className={this.props.parcel === "4" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="4" placeholder="4" disabled={this.props.hasSale}></input >
                                    <input id="parcel_6" type="button" className={this.props.parcel === "6" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="6" placeholder="6" disabled={this.props.hasSale}></input >
                                    <input id="parcel_8" type="button" className={this.props.parcel === "8" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="8" placeholder="8" disabled={this.props.hasSale}></input >
                                    <input id="parcel_10" type="button" className={this.props.parcel === "10" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="10" placeholder="10" disabled={this.props.hasSale}></input >

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MOBILE */}
                <div className="payment-resume-mobile">
                    <div className="justify-content-end d-flex align-items-end">
                        <div className="col resume-mobile-box">
                            <div className="payment-img" onClick={() => this.setState({ collapse: !this.state.collapse })}>
                                <span className="coverage-plan"><span className="coverage-plan-mobile">Plano</span><span className="secondWord">{this.state.planType.toUpperCase()}</span><img className="plan-resume" src={arrow} alt="Resumo do seu plano" /></span>
                            </div>
                            <div className="lead-plan-value">
                                <span className="resume-total">Valor:</span><span className="resume-price">{this.props.parcel}x R$</span><span className="resume-parcel">{(this.props.productValue / parseInt(this.props.parcel)).toFixed(2).toString().replace(".", ",")}</span>
                            </div>
                            <div>
                                <span className="resume-total">Número de parcelas: {this.props.parcel}</span>
                            </div>
                            <CollapseResumePayment collapseData={this.props.collapseData} collapse={this.state.collapse} openCollapse={this.openCollapse} parcel={this.props.parcel} price={(this.props.productValue / parseInt(this.props.parcel)).toFixed(2).toString().replace(".", ",")}></CollapseResumePayment>
                        </div>
                        <div className="col">
                            <div className="number-parcel">
                                Número de parcelas: {this.props.parcel}
                            </div>
                            <div className="input-group-prepend row justify-content-center d-flex align-items-center">
                                <input id="parcel_1" type="button" className={this.props.parcel === "1" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="1" placeholder="1" disabled={this.props.hasSale}></input>
                                <input id="parcel_2" type="button" className={this.props.parcel === "2" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="2" placeholder="2" disabled={this.props.hasSale}></input>
                                <input id="parcel_4" type="button" className={this.props.parcel === "4" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="4" placeholder="4" disabled={this.props.hasSale}></input>
                            </div>
                            <div className="input-group-prepend row justify-content-center d-flex align-items-center">
                                <input id="parcel_6" type="button" className={this.props.parcel === "6" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="6" placeholder="6" disabled={this.props.hasSale}></input >
                                <input id="parcel_8" type="button" className={this.props.parcel === "8" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="8" placeholder="8" disabled={this.props.hasSale}></input >
                                <input id="parcel_10" type="button" className={this.props.parcel === "10" ? "input-group-text" : "input-group-text selected"} onClick={this.handleChange} value="10" placeholder="10" disabled={this.props.hasSale}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PaymentResume