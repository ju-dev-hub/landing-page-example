import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Import Service
import LeadService from '../redux/lead_service'
import ListService from '../redux/list_service'

// Import Libs
import InputMask from 'react-input-mask'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'
import TagManager from 'react-gtm-module'

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Images
import batataGarantido from '../img/batataGarantido.svg'
import baselinePeople from '../img/baselinePeople.svg'
import baselineEmail from '../img/baselineEmail.svg'
import phone from '../img/phone.svg'

class OperatorCotation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 2,
            stepName: 'planos-descricao',
            name: '',
            email: '',
            phone: '',
            quote: '',
            idCampaign: 28,
            medias: [],
            media: {},
            url: '',
            clientId: '',
            btnDisabled: false,
            operator: {
                id: localStorage.operatorId ? localStorage.operatorId : null,
                name: localStorage.operatorName ? localStorage.operatorName : ''
            }
        }
    }

    UNSAFE_componentWillMount() {
        TagManager.initialize({ gtmId: 'GTM-TK67XL3' })
        this.getMediaList()
    }

    getMediaList = async () => {
        try {
            const listService = new ListService()
            const res = await listService.getMediaList(this.state.idCampaign)
            if (res && res.data) {
                this.setState({
                    medias: res.data
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    getClientById = async (id) => {
        if (id && id.length === 24) {
            // Find LEAD
            const getLead = new LeadService()
            const lead = await getLead.findLead(id)

            if (lead && lead.data) {
                // Update Operator
                const updateOperator = new LeadService()
                const update = await updateOperator.getClientId(id, this.state.operator, this.state.media.name)

                if (update && update.data && update.data.customer) {
                    // Redirect Operator
                    const clientData = update.data
                    if (clientData.stepName === 'planos-descricao') {
                        toast.success(`O(a) cliente ${clientData.customer.name} foi indentificado(a) e ainda não escolheu o plano. Você será redirecionado(a) para a tela ESCOLHA DE PLANOS.`)
                        setTimeout(() => window.location.href = `/contract/coverage/2/${clientData._id}`, 6000)
                    }
                    else {
                        toast.success(`O(a) cliente ${clientData.customer.name} foi identificado(a). Você será redirecionado(a) para a tela DADOS PESSOAIS.`)
                        setTimeout(() => window.location.href = `/form/details/3/${clientData._id}`, 6000)
                    }
                }
                else {
                    toast.error('Ocorreu um erro. Verifique o ID e tente novamente!')
                }
            }
            else {
                if (lead) {
                    if (lead.error || lead.data === null) {
                        toast.error('ID inválido. Informe os dados do cliente.')
                        this.setState({ idNotFound: true })
                    }
                }
            }
        }
    }

    validateId() {
        if (this.state.clientId && this.state.clientId.length < 24) {
            toast.error('ID do cliente inválido.')
        }
    }

    render() {
        return (
            <div id="form-red-box" >
                <ToastContainer
                    position="bottom-center"
                    hideProgressBar={true}
                    newestOnTop
                    closeOnClick={true}
                    rtl={false}
                    pauseOnVisibilityChange={false}
                    draggable={false}
                    pauseOnHover={false}
                />
                <div className="row justify-content-center d-flex align-items-center">
                    <div className="col-lg-7 col-md-7 col-sm-7 col-xs-6 col-6">
                        <h1 className="cotation-title">Seguro Residencial</h1>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-6 col-xs-6 justify-content-end d-flex align-items-end">
                        <div className="price-plan-title">
                            <p className="plansOf"> Planos a partir de: </p>
                            <p className="price-half">10x</p>
                            <div className="row box-cotation-price">
                                <div className="col price-title">R$ </div>
                                <div className="col size-number">15</div>
                                <div className="col price-title">,89</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" id="box-cotation-subtitle">
                        <p className="cotation-subtitle">Comodidade e agilidade por menos de R$0,50/dia</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12" id="box-cotation-text">
                        <div className="cotation-text">
                            Com o seguro residencial online da segure.ai, em poucos passos você protege sua casa e ainda conta com as melhores assistências 24h do mercado. <br /> Não se preocupe com problemas cotidianos como: danos em eletrodomésticos, móveis, instalações elétricas e hidráulicas. Faça uma cotação gratuita!
                        </div>
                    </div>
                </div>
                <div className="col-12" id="box-form">
                    <form autoComplete="off">
                        <div className="form-group mb-4">
                            <select id="inputMedia" className='custom-select form-control media' required
                                onChange={(e) => {
                                    this.setState({
                                        media: JSON.parse(e.target.value),
                                        url: '',
                                        email: '',
                                        name: '',
                                        phone: '',
                                        quote: '',
                                        clientId: '',
                                        idNotFound: false,
                                        operator: {
                                            id: localStorage.operatorId ? localStorage.operatorId : this.state.operator.id,
                                            name: localStorage.operatorName ? localStorage.operatorName : this.state.operator.name
                                        }
                                    })
                                }}>
                                <option className='media-option' value={`{"id": "","name":""}`}>Canal</option>
                                {
                                    this.state.medias.map((item, i) => {
                                        return (
                                            <option className='media-option' key={i} value={`{"id":${item.id},"name":"${item.name}"}`}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        {/* Chat/Blip/Facebook */}
                        {
                            this.state.media.name === "Chat" || this.state.media.name === "Blip" || this.state.media.name === "Facebook" ?
                                <div className="form-group mb-4">
                                    <input id="url" type="text" placeholder="Informe a URL de origem do Cliente" className="form-control"
                                        autoFocus="autofocus"
                                        value={this.state.url}
                                        onChange={(e) => { this.setState({ url: e.target.value }) }}
                                        required />
                                </div>
                                : null
                        }
                        {/* VOZ */}
                        {
                            this.state.media.name === "Voz" && this.state.idNotFound === false ?
                                <div className="form-group mb-4">
                                    <input id="clientId" type="text" placeholder="Informe o ID do Cliente" className="form-control" maxLength="24"
                                        autoFocus="autofocus"
                                        value={this.state.clientId}
                                        onChange={(e) => {
                                            this.getClientById(e.target.value)
                                            this.setState({ clientId: e.target.value })
                                        }}
                                        onBlur={this.validateId.bind(this)}
                                        required />
                                </div>
                                : null
                        }
                        {this.state.media.name !== "Voz" || this.state.idNotFound === true ?
                            <div>
                                <div className="form-group mb-4">
                                    <input id="inputName" type="text" placeholder="Nome completo" className="form-control" minLength="3"
                                        value={this.state.name}
                                        onChange={(e) => this.setState({ name: e.target.value.toUpperCase().replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.' ]/gi, "") })}
                                        required />
                                    <img className="img-input-cotation" src={baselinePeople} alt="Nome completo" />
                                </div>
                                <div className="form-group mb-4">
                                    <input id="inputEmail" type="email" placeholder="Email" className="form-control"
                                        value={this.state.email}
                                        onChange={(e) => this.setState({ email: e.target.value.replace(/[^a-zA-Z0-9-_.@]/gi, "") })}
                                        required />
                                    <img className="img-input-cotation" src={baselineEmail} alt="Email" />
                                </div>
                                <div className="form-group mb-4">
                                    {
                                        (this.state.phone.replace(/[^0-9]/g, '').charAt(2) === '9' ?
                                            <InputMask
                                                beforeMaskedValueChange={this.beforeMaskedValueChange.bind(this)}
                                                type="tel"
                                                id="inputPhone"
                                                mask={this.state.phone ? "(99) 99999-9999" : null}
                                                className="form-control"
                                                placeholder="Telefone"
                                                maskChar={null}
                                                value={this.state.phone}
                                                onChange={(e) => this.setState({ phone: e.target.value })} /> :
                                            <InputMask
                                                beforeMaskedValueChange={this.beforeMaskedValueChange.bind(this)}
                                                type="tel"
                                                id="inputPhone"
                                                mask={this.state.phone ? "(99) 9999-9999" : null}
                                                className="form-control"
                                                placeholder="Telefone"
                                                maskChar={null}
                                                value={this.state.phone}
                                                onChange={(e) => this.setState({ phone: e.target.value })} />
                                        )
                                    }
                                    <img className="img-input-cotation phone" src={phone} alt="Telefone" />
                                </div>
                                <div className="row livein">
                                    <div className="col-sm-5 col-4 livein-title">
                                        <span>Eu moro em:</span>
                                    </div>
                                    <div className="col-sm-7 col-8 livein-radio">
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="custom-control custom-radio custom-control-inline radio-cotation">
                                                    <input id="customRadioInline2" type="radio" name="customRadioInline1" className="custom-control-input"
                                                        value="CASA" onChange={(e) => this.setState({ quote: e.target.value })}>
                                                    </input>
                                                    <label className="custom-control-label home" htmlFor="customRadioInline2">Casa</label>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="custom-control custom-radio custom-control-inline radio-cotation">
                                                    <input id="customRadioInline1" type="radio" name="customRadioInline1" className="custom-control-input"
                                                        value="APARTAMENTO" onChange={(e) => this.setState({ quote: e.target.value })}>
                                                    </input>
                                                    <label className="custom-control-label apartament" htmlFor="customRadioInline1">Apartamento</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="button-cotation" type="button" id="btnCotationOperator" onClick={this.create} disabled={this.state.btnDisabled}>
                                        FAÇA SUA COTAÇÃO AGORA MESMO
                            </button>
                                </div>
                            </div>
                            : null
                        }
                        <div className="col-12 pt-4 text-center">
                            <img className="img-batata" src={batataGarantido} alt="Imagem Garantido por BATATA" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    beforeMaskedValueChange = (newState) => {
        var { value } = newState
        var selection = newState.selection
        var cursorPosition = selection ? selection.start : null

        if (value.endsWith('(')) {
            if (cursorPosition === value.length) {
                cursorPosition--;
                selection = { start: cursorPosition, end: cursorPosition }
            }
            value = value.slice(0, -1)
        }

        return {
            value,
            selection
        }
    }

    create = async () => {
        try {
            this.setState({ btnDisabled: true })

            var validateName = this.state.name

            var validateEmail = this.state.email
            var regexEmail = new RegExp('^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')

            var validatePhone = this.state.phone.replace(/[^0-9]/g, '')
            var regexPhone = /^[0-9]{10,11}$/

            var validateUrl = this.state.url
            var regexUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/gi

            if (validateName.trim().split(' ').length < 2 || this.state.name === "") {
                this.setState({ btnDisabled: false })
                toast.error("Por favor, informe nome e sobrenome.")
            }
            else if (!regexEmail.test(validateEmail)) {
                this.setState({ btnDisabled: false })
                toast.error("Por favor, verifique o email digitado.")
            }
            else if (!regexPhone.test(validatePhone) && this.state.phone !== "") {
                this.setState({ btnDisabled: false })
                toast.error("Por favor, verifique o telefone digitado.")
            }
            else if (this.state.media.id === null || !this.state.media.id) {
                this.setState({ btnDisabled: false })
                toast.error("Por favor, selecione o canal de origem do cliente.")
            }
            else if ((this.state.media.name === 'Blip' || this.state.media.name === 'Facebook' || this.state.media.name === 'Chat') && (!regexUrl.test(validateUrl) || !this.state.url)) {
                this.setState({ btnDisabled: false })
                toast.error("Por favor, informe a URL de origem do cliente.")
            }
            else if (!this.state.quote) {
                this.setState({ btnDisabled: false })
                toast.error("Por favor, selecione casa ou apartamento.")
            }
            else {
                const leadService = new LeadService()
                const res = await leadService.create(this.state.name, this.state.email, this.state.phone, this.state.step, this.state.stepName, this.state.quote, this.state.media, this.state.url, this.state.operator)

                if (res.data && res.data._id) {
                    localStorage.setItem('segureAiId', `${res.data._id}`)
                    window.location.href = `/contract/coverage/2/${res.data._id}`
                }
                else {
                    this.setState({ btnDisabled: false })
                    if (res && res.error && res.message) {
                        toast.error(res.message)
                    }
                    else {
                        toast.error("Ocorreu um erro ao salvar os seus dados. Por favor, aguarde alguns instantes e tente realizar a cotação novamente.")
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
            this.setState({ btnDisabled: false })
        }
    }
}

export default withRouter(OperatorCotation)
