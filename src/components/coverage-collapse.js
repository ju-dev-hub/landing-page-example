import React from 'react'
import { Collapse } from 'reactstrap'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import images
import arrowDown from '../img/arrow-down.svg'
import arrowUp from '../img/arrow-up.svg'

class CollapseAssistence extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false
        }
    }

    render() {
        return (
            <div className="">
                <div className="row justify-content-center d-flex align-items-center plan-details" onClick={() => this.setState({ collapse: !this.state.collapse })}>
                    <span>Saiba mais sobre a cobertura e assistência deste plano</span>
                    <img className={this.state.collapse ? "toggleContent-closed collapse-arrow" : "toggleContent-open collapse-arrow"} src={arrowDown} alt="Seta para baixo"></img>
                    <img className={this.state.collapse ? "toggleContent-open collapse-arrow" : "toggleContent-closed collapse-arrow"} src={arrowUp} alt="Seta para cima"></img>
                </div>
                <Collapse isOpen={this.state.collapse} className="box-coverage">
                    <div className="row justify-content-center d-flex align-items-center plan-coverage">Confira a cobertura de seu plano <span>{this.props.data.name.indexOf("CASA") === -1 ? this.props.data.name.replace("APARTAMENTO", "") : this.props.data.name.replace("CASA", "")}</span></div>
                    <div>
                        <table className="table-coverage">
                            <tbody>
                                {
                                    Object.keys(this.props.data.description).map((item, i) => {
                                        return (
                                            <tr key={i} id={this.props.data[item]}>
                                                <th className="assistance-description">{Object.keys(this.props.data.description)[i]}</th>
                                                <th className="assistance-description-value">{this.props.data.description[item]}</th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row justify-content-center d-flex align-items-center">
                        <span className="top-plus">Assistência Top Plus inclusa no plano</span>
                        <div className="row top-plus-itens">
                            <div className="col-6">
                                <li className="list-group-item">Serviço de chaveiro</li>
                                <li className="list-group-item">Serviço de encanador</li>
                                <li className="list-group-item">Serviço de eletricista</li>
                                <li className="list-group-item">Serviço de vidraceiro</li>
                            </div>
                            <div className="col-6">
                                <li className="list-group-item">Serviço de vigia</li>
                                <li className="list-group-item">Serviço de desentupimento</li>
                                <li className="list-group-item">Manut. de eletrodomésticos</li>
                                <li className="list-group-item">Manut. e suporte residencial</li>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => this.setState({ collapse: !this.state.collapse })}>
                        <a className="row justify-content-center d-flex align-items-center goback-plans" href="#choice">
                            Voltar em planos
                    </a>
                    </div>
                </Collapse>
            </div>
        );
    }
}
export default CollapseAssistence

