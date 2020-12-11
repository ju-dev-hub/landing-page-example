import React from 'react'
import { Collapse } from 'reactstrap'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

class CollapsePayment extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
    }

    toggle() {
        this.props.openCollapse(!this.props.collapse)
    }

    render() {
        if (this.props.collapseData && this.props.collapseData.name && this.props.collapseData.promotionalDesc && this.props.collapseData.description) {
            const price = this.props.collapseData.value.toFixed(2).toString().replace(".", ",")
            return (
                <Collapse isOpen={this.props.collapse} className="collapse-payment">
                    <div onClick={this.toggle} className="row justify-content-center d-flex align-items-center collapse-title">Confira a cobertura de seu plano<span className="collapse-title-plan">{this.props.collapseData.name.indexOf("CASA") === -1 ? this.props.collapseData.name.replace("APARTAMENTO", "") : this.props.collapseData.name.replace("CASA", "")}</span>
                        <div className="collapse-x">X</div>
                    </div>
                    <div className="collapse-row"></div>
                    <div className="row">
                        <div className="collapse-box-title col-6">
                            <div className="collapse-plan-title">{this.props.collapseData.name.indexOf("CASA") === -1 ? this.props.collapseData.name.replace("APARTAMENTO", "") : this.props.collapseData.name.replace("CASA", "")}</div>
                            {
                                this.props.collapseData.promotionalDesc === 'Integral' ?
                                    <div className="collapse-plan-subtitle">Plano para quem quer uma cobertura e assistência completa.</div> : this.props.collapseData.promotionalDesc === 'Pleno' ?
                                        <div className="collapse-plan-subtitle">Plano para quem busca segurança pelo melhor custo/benefício.</div> : <div className="collapse-plan-subtitle">Plano para quem busca uma assistência 24 horas completa.</div>
                            }
                        </div>
                        <div className="collapse-box-price col-6">
                            <div className="row">
                                <div className="collapse-box-subtitle">
                                    <div className="collapse-plan-description">Por apenas {this.props.parcel}x</div>
                                    <div className="collapse-plan-assistence">R$ {this.props.price} </div>
                                    <div className="collapse-plan-price">R$ {price} valor total</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="collapse-row"></div>
                    <div className="row">
                        <table className="collapse-price">
                            <tbody>
                                {
                                    Object.keys(this.props.collapseData.description).map((item, i) => {
                                        return (
                                            <tr key={i} id={this.props.collapseData[item]}>
                                                <th className="collapse-coverage">{Object.keys(this.props.collapseData.description)[i]}</th>
                                                <th className="collapse-coverage-value">{this.props.collapseData.description[item]}</th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="collapse-row"></div>
                    <div className="row">
                        <div className="row justify-content-center d-flex align-items-center">
                            <span className="collapse-top-plus">Assistência Top Plus inclusa no plano</span>
                        </div>
                        <div className="row collapse-top-itens">
                            <div className="col-6">
                                <li className="list-group-item">Serviço de chaveiro</li>
                                <li className="list-group-item">Serviço de encanador</li>
                                <li className="list-group-item">Serviço de eletricista</li>
                                <li className="list-group-item">Serviço de vidraceiro</li>
                            </div>
                            <div className="col-6 payment">
                                <li className="list-group-item">Serviço de vigia</li>
                                <li className="list-group-item">Serviço de desentupimento</li>
                                <li className="list-group-item">Manut. de eletrodomésticos</li>
                                <li className="list-group-item">Manut. e suporte residencial</li>
                            </div>
                        </div>
                    </div>
                </Collapse>
            )
        } else {
            return null
        }
    }
}
export default CollapsePayment

