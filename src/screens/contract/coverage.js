import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Import Services
import LeadService from '../../redux/lead_service'
import ListService from '../../redux/list_service'

// Import Components
import Footer from '../../components/footer'
import Copyright from '../../components/copyright'
import CollapseAssistence from '../../components/coverage-collapse'
import WhatsappChat from '../../components/whatsapp'
import PlusAssistance from '../../components/plus-assistance'
import Steps from '../../components/steps'
import { toast, ToastContainer } from "react-toastify"

// Import Libs
import TagManager from 'react-gtm-module'

// Import CSS Files
import '../../style/desktop.css'
import '../../style/tablet.css'
import '../../style/mobile.css'

// Import images
import bestPlan from '../../img/mais-vendido.svg'

class Coverage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 3,
            stepDisabled: '',
            stepName: 'dados-pessoais',
            id: this.props.match.params.id,
            routerApp: `/`,
            products: [],
            loading: false,
            btnDisabled: false,
            leadQuote: '',
            leadInfo: '',
            loader: Array.from(Array(3).keys()),
            getIdProduct: '',
            media: {}
        }
    }

    componentDidMount = async () => {
        TagManager.initialize({ gtmId: 'GTM-TK67XL3' })
        const quote = await this.getLead()
        this.getProducts(quote)
    }

    getLead = async () => {
        try {
            const getId = this.state.id
            const leadService = new LeadService()
            const res = await leadService.findLead(getId)

            if (res && res.data && res.error === false) {
                this.setState({
                    leadInfo: res.data,
                    leadQuote: res.data.quote,
                    stepDisabled: 'coverage',
                    media: res.data.media && res.data.media.id ? res.data.media : { "id": 50, "name": "Formulário" },
                })
                return this.state.leadQuote
            }
            else {
                toast.error('Ocorreu um erro. Você será redirecionado para a tela inicial. Faça a sua cotação novamente.')
                this.setState({ loading: false })
                setTimeout(() => window.location.href = '/', 5000)
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro. Você será redirecionado para a tela inicial. Faça a sua cotação novamente.')
            setTimeout(() => window.location.href = '/', 5000)
            console.log(err)
        }
    }

    getProducts = async (quote) => {
        try {
            const listService = new ListService()
            const res = await listService.getProducts([28], true)

            if (res && res.data && res.data.length > 0) {
                const products = res.data.filter((product) => {
                    return product.productGroup.name === quote
                })
                this.setState({ products: products })
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro. Você será redirecionado para a tela inicial. Faça a sua cotação novamente.')
            setTimeout(() => window.location.href = '/', 5000)
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <Steps step={ this.state.step } stepDisabled={ this.state.stepDisabled } id={ this.state.id } />
                <ToastContainer
                    position="bottom-center"
                    autoClose={ 5000 }
                    hideProgressBar={ false }
                    newestOnTop
                    closeOnClick={ false }
                    rtl={ false }
                    pauseOnVisibilityChange={ false }
                    draggable={ false }
                    pauseOnHover={ false }
                />
                <div className="row justify-content-center d-flex align-items-top ">
                    <div className="container-fluid col-11 col-sm-10 align-self-center">

                        {/* MOBILE */ }
                        <div className="coverage-mobile">
                            <div className="col-12 text-center mobile-title-coverage" id="choice">Escolha sua cobertura entre os planos abaixo:</div>
                            <PlusAssistance />
                            <div className="row">
                                {
                                    this.state.products.length > 0 ? this.state.products.map((value, i) => {

                                        //Get the value of parcel
                                        const price = value.value.toFixed(2).toString().replace(".", ",")
                                        const parcel = (value.value / 10).toString().substring(0, 2)
                                        const cents = (value.value / 10).toFixed(2).toString().substring(3)
                                        const assistancePlus = {
                                            value: value
                                        }
                                        return (
                                            <div className="container-coverage-screen col-12" key={ i }>
                                                <div className="white-box-coverage col-12">
                                                    {
                                                        this.state.products[i].promotionalDesc === "Pleno" ?
                                                            <div>
                                                                <img key={ i } className="best-plan" src={ bestPlan } alt="Plano mais vendido"></img>
                                                                <div className="yellow-border">
                                                                </div> </div> : null
                                                    }
                                                    <div className="row">
                                                        <div className="coverage-box-title col-6">
                                                            <div className="plan-title">{ value.name.indexOf("CASA") === -1 ? value.name.replace("APARTAMENTO", "") : value.name.replace("CASA", "") }</div>
                                                            {
                                                                value.promotionalDesc === 'Integral' ?
                                                                    <div className="plan-subtitle">Plano para quem quer uma cobertura e assistência completa.</div> : value.promotionalDesc === 'Pleno' ?
                                                                        <div className="plan-subtitle">Plano para quem busca segurança pelo melhor custo/benefício.</div> : <div className="plan-subtitle">Plano para quem busca uma assistência 24 horas completa.</div>
                                                            }

                                                        </div>
                                                        <div className="col-6">
                                                            <div className="row">
                                                                <div className="coverage-box-subtitle">
                                                                    <div className="plan-description">Por apenas 10x</div>
                                                                    <div className="plan-assistence">R$ { parcel },{ cents ? cents : "00" } </div>
                                                                    <div className="price-subtitle">R$ { price } valor total</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-center d-flex align-items-center">
                                                        <div className="col-12">
                                                            <button className={ this.state.loading === true ? "btn-coverage loading" : "btn-coverage" } id={ value.promotionalDesc === 'Integral' ? "btnIntegral" : value.promotionalDesc === 'Essencial' ? "btnEssencial" : "btnPleno" } type="button" disabled={ this.state.btnDisabled }
                                                                onClick={ () => this.saveProducts(value.id, value.name) }>
                                                                { this.state.loading === true && this.state.getIdProduct === value.id ? 'AGUARDE...' : 'CONTRATAR' }
                                                                {
                                                                    this.state.loading === true && this.state.getIdProduct === value.id ?
                                                                        <div className="spinner-border coverage text-danger" role="status">
                                                                        </div>
                                                                        : null
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        { Object.keys(assistancePlus).map((key, index) =>
                                                            <CollapseAssistence key={ index } data={ assistancePlus[key] } />
                                                        ) }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                        :
                                        <div className="container-coverage-screen col-12">
                                            {
                                                this.state.loader.map((i) => {
                                                    return (
                                                        <div key={ i } className="grey-box-coverage col-12">
                                                            <div className="row btn-loader">
                                                                <div className="coverage-box-title col-6"></div>
                                                                <div className="col-6">
                                                                    <div className="row">
                                                                        <div className="coverage-box-subtitle"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row justify-content-center d-flex align-items-center">
                                                                <div className="col-12">
                                                                    <button className="btn-coverage-loader" type="button" disabled>
                                                                        AGUARDE...
                                                                        <div className="spinner-border coverage text-danger" role="status"></div>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                }
                            </div>
                        </div>

                        {/* DESKTOP */ }
                        <div className="coverage-desktop">
                            <div className="col-12 text-center title-box-coverage">Assistência Top Plus</div>
                            <div className="col-12 text-center subtitle-box-coverage">Incluso em todos os planos</div>
                            <PlusAssistance />
                            <div className="row justify-content-center d-flex align-items-top">
                                {
                                    this.state.products.length > 0 ? this.state.products.map((value, i) => {

                                        //Get the value of parcel
                                        const price = value.value.toFixed(2).toString().replace(".", ",")
                                        const parcel = (value.value / 10).toString().substring(0, 2)
                                        const cents = (value.value / 10).toFixed(2).toString().substring(3)

                                        return (
                                            <div className="container-coverage-screen col-12 col-xl-4 col-lg-6 col-md-6" key={ i }>
                                                <div className="white-box-coverage col-12">
                                                    {
                                                        this.state.products[i].promotionalDesc === "Pleno" ?
                                                            <div className="yellow-border">
                                                                <img key={ i } className="best-plan" src={ bestPlan } alt="Plano mais vendido"></img>
                                                            </div> : null
                                                    }
                                                    <div className="coverage-box-title">
                                                        <div className="plan-title">{ value.name.indexOf("CASA") === -1 ? value.name.replace("APARTAMENTO", "") : value.name.replace("CASA", "") }</div>
                                                        {
                                                            value.promotionalDesc === 'Integral' ?
                                                                <div className="plan-subtitle">Plano para quem quer uma cobertura e assistência completa.</div> : value.promotionalDesc === 'Pleno' ?
                                                                    <div className="plan-subtitle">Plano para quem busca segurança pelo melhor custo/benefício.</div> : <div className="plan-subtitle">Plano para quem busca uma assistência 24 horas completa.</div>
                                                        }
                                                    </div>
                                                    <table className="table-coverage">
                                                        <tbody>
                                                            {
                                                                Object.keys(value.description).map((item, i) => {
                                                                    return (
                                                                        <tr key={ i }>
                                                                            <th className="text-left">{ Object.keys(value.description)[i] }</th>
                                                                            <th className="text-right">{ value.description[item] }</th>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <div className="row justify-content-center d-flex align-items-center">
                                                        <div className="coverage-box-subtitle">
                                                            <div className="plan-description">Por apenas 10x no crédito ou débito</div>
                                                            <div className="plan-assistence">R$ { parcel },{ cents ? cents : "00" } </div>
                                                            <div className="price-subtitle">ou { price } à vista</div>
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-center d-flex align-items-center">
                                                        <div className="col-10">
                                                            <button className={ this.state.loading === true ? "btn-coverage loading" : "btn-coverage" } id={ value.promotionalDesc === 'Integral' ? "btnIntegral" : value.promotionalDesc === 'Essencial' ? "btnEssencial" : "btnPleno" } type="button" disabled={ this.state.btnDisabled }
                                                                onClick={ () => this.saveProducts(value.id, value.name) }>
                                                                { this.state.loading === true && this.state.getIdProduct === value.id ? 'AGUARDE...' : 'CONTRATAR' }
                                                                {
                                                                    this.state.loading === true && this.state.getIdProduct === value.id ?
                                                                        <div className="spinner-border coverage text-danger" role="status">
                                                                        </div>
                                                                        : null
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                        :
                                        <div className="row justify-content-center d-flex align-items-top">
                                            {
                                                this.state.loader.map((i) => {
                                                    return (
                                                        <div key={ i } className="container-coverage-screen col-12 col-xl-4 col-lg-6 col-md-6">
                                                            <div className="grey-box-coverage col-12">
                                                                <div className="coverage-box-title loader"></div>
                                                                <div className="table-coverage loader"></div>
                                                                <div className="row justify-content-center d-flex align-items-center">
                                                                    <div className="coverage-box-subtitle"></div>
                                                                </div>
                                                                <div className="row justify-content-center d-flex align-items-center">
                                                                    <div className="col-11">
                                                                        <button className="btn-coverage-loader" type="button" disabled>
                                                                            AGUARDE...
                                                                            <div className="spinner-border coverage text-danger" role="status"></div>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <WhatsappChat />
                <div className="col-12 footer-coverage" id="background-footer">
                    <Footer></Footer>
                </div>
                <div className="col-12" id="background-copyright">
                    <Copyright></Copyright>
                </div>
            </div>
        )
    }

    saveProducts = async (idProduct, coverage) => {
        this.setState({ loading: true, btnDisabled: true, getIdProduct: idProduct })

        try {
            const userInfo = {
                step: this.state.step,
                stepName: this.state.stepName,
                steps: this.state.leadInfo.steps,
                media: this.state.media,

                idLead: this.state.leadInfo.idLead,

                idProduct: idProduct,
                coverage: coverage,

                email: this.state.leadInfo.email || null,
                phone: this.state.leadInfo.phone || null,

                customer: this.state.leadInfo.customer
            }

            const leadService = new LeadService()
            await leadService.update(this.props.match.params.id, userInfo)
            window.location.href = `/form/details/3/${this.props.match.params.id}`
        }
        catch (err) {
            toast.error('Ocorreu um erro. Escolha o seu plano novamente. Se o erro persistir, aguarde alguns instantes.')
            this.setState({ loading: false, btnDisabled: false })
            console.log(err)
        }
    }
}

export default withRouter(Coverage)