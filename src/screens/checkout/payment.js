import React, { Component } from 'react'

// Import Libs
import { Tab, Tabs } from 'react-bootstrap'
import moment from 'moment/moment.js'
import { toast, ToastContainer } from "react-toastify"
import MaskedInput from 'react-text-mask'
import CreditCardInput from 'react-credit-card-input'
import TagManager from 'react-gtm-module'
import InputMask from 'react-input-mask'
import creditCardType from 'credit-card-type'

// Import Components
import Footer from '../../components/footer'
import Copyright from '../../components/copyright'
import WhatsappChat from '../../components/whatsapp'
import PaymentResume from '../../components/payment-resume'
import Steps from '../../components/steps'

// Import CSS Files
import '../../style/desktop.css'
import '../../style/tablet.css'
import '../../style/mobile.css'

//Import Service
import LeadService from '../../redux/lead_service'
import ListService from '../../redux/list_service'
import FieldValidation from '../../redux/field_validation'

// Import Images
import baselinePeople from '../../img/baselinePeople.svg'

const validateService = new FieldValidation()

class Payment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 6,
            stepName: 'sucesso',
            stepDisabled: '',
            value: '',
            clientName: '',
            name: '',
            coverage: '',
            productValue: '',
            product: {},
            bankList: [],
            leadQuote: '',
            parcel: '10',
            paymentType: 'credit',
            hasOperator: false,
            email: '',
            collapseData: {},
            emailSended: false,

            classValidate: {
                cardNumber: 'form-input',
                expiringDate: 'form-input',
                cardCvc: 'form-input',
                clientName: 'form-input',
                clientCpf: 'form-input',
                bank: 'form-select',
                agency: 'form-input',
                account: 'form-input',
                verifyingDigit: 'form-input'
            },

            loadingCredit: false,
            loadingDebit: false,
            btnDisabled: false,
            payDay: moment().add(5, "d").format("DD"),

            id: this.props.match.params.id,
            routerAddress: `/form/address/4/${this.props.match.params.id}`
        }

        this.handleParcelChange = this.handleParcelChange.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
    }

    async UNSAFE_componentWillMount() {
        TagManager.initialize({ gtmId: 'GTM-TK67XL3' })
        await this.bankList()
        this.getLead()
    }

    bankList = async () => {
        try {
            const service = new ListService()
            const res = await service.bankList()

            if (res && res.data && res.error === false) {
                this.setState({ bankList: res.data })
            }
            else {
                toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Tente avançar novamente.')
                setTimeout(() => window.location.href = this.state.routerAddress, 5000)
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Tente avançar novamente.')
            setTimeout(() => window.location.href = this.state.routerAddress, 5000)
            console.log(err)
        }
    }

    getLead = async () => {
        try {
            const getId = this.state.id
            const leadService = new LeadService()
            const lead = await leadService.findLead(getId)

            if (!lead || !lead.data) {
                toast.error('Ocorreu um erro ao buscar os seus dados. Você será redirecionado para a tela anterior. Preencha os seus dados e tente avançar.')
                setTimeout(() => window.location.href = this.state.routerAddress, 5000)
            }

            const getIdProduct = lead.data.idProduct
            const listService = new ListService()
            const product = await listService.viewProduct(getIdProduct)

            if (!product || !product.data) {
                toast.error('Ocorreu um erro ao buscar o seu plano. Você será redirecionado. Escolha o seu plano novamente!!')
                setTimeout(() => window.location.href = `/contract/coverage/2/${this.state.id}`, 5000)
            }

            if (lead && lead.data && lead.data.payment && product && product.data && product.data.id && product.data.value) {
                let value = product.data.value
                if (lead.data.payment.valueWithInstallment && lead.data.payment.numberOfInstallments) {
                    value = lead.data.payment.numberOfInstallments + "/" + lead.data.payment.valueWithInstallment
                }
                value = value.toString()
                this.setState({
                    hasSale: lead.data.batata.sended,
                    leadInfo: lead.data,
                    leadProduct: lead.data.idProduct,
                    leadQuote: lead.data.quote,
                    paymentType: lead.data.payment.paymentType || 'credit',
                    clientName: lead.data.payment.clientName || '',
                    valueWithInstallment: lead.data.payment.valueWithInstallment || '',
                    parcel: (lead.data.payment.numberOfInstallments) ? String(lead.data.payment.numberOfInstallments) : '10',
                    cardNumber: lead.data.payment.cardNumber || '',
                    expiringDate: lead.data.payment.expiringDate || '',
                    cardCvc: lead.data.payment.cardCvc || '',
                    cardType: lead.data.payment.cardType || '',
                    clientCpf: lead.data.payment.clientCpf || '',
                    payDay: lead.data.payment.payDay || this.state.payDay,
                    bank: (lead.data.payment.bank && lead.data.payment.bank.code) ? JSON.stringify(lead.data.payment.bank) : '',
                    agency: lead.data.payment.agency || '',
                    account: lead.data.payment.account || '',
                    verifyingDigit: lead.data.payment.verifyingDigit || '',
                    name: lead.data.customer.name || '',
                    coverage: lead.data.coverage || '',
                    productValue: lead.data.productValue || '',
                    stepDisabled: 'payment',
                    email: lead.data.email || '',
                    value: value || '',
                    product: product.data || {},
                    collapseData: product.data || {},
                    hasOperator: (lead.data.operator && lead.data.operator.id) ? true : false
                })

                // Validate payment fields
                this.validateCardNumber(this.state.cardNumber)
                this.validateExpingDate(this.state.expiringDate)
                this.validateCardCvc(this.state.cardCvc)
                this.validateName(this.state.clientName)
                this.validateCpf(this.state.clientCpf)

                this.validateBank(this.state.bank)
                this.validateAccount(this.state.account)
                this.validateAgency(this.state.agency)
                this.validateDigit(this.state.verifyingDigit)
            }
            else {
                toast.error('Ocorreu um erro ao buscar os seus dados. Você será redirecionado para a tela anterior. Preencha os seus dados e tente avançar.')
                setTimeout(() => window.location.href = `/form/address/4/${this.state.id}`, 5000)
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Tente avançar novamente.')
            setTimeout(() => window.location.href = this.state.routerAddress, 5000)
            console.log(err)
        }
    }

    handleParcelChange(value) {
        this.setState({ parcel: value });
    }

    // Card Fields Validations
    validateCardNumber = async (card) => {
        const res = await validateService.validateCardNumber(card)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                cardNumber: res
            }
        }))
    }

    validateExpingDate = async (expiringDate) => {
        const res = await validateService.validateExpingDate(expiringDate)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                expiringDate: res
            }
        }))
    }

    validateCardCvc = async (cardCvc) => {
        const res = await validateService.validateCardCvc(cardCvc)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                cardCvc: res
            }
        }))
    }

    validateName = async (clientName) => {
        const res = await validateService.validateName(clientName)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                clientName: res
            }
        }))
    }

    validateCpf = async (cpf) => {
        const res = await validateService.validateCpf(cpf)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                clientCpf: res
            }
        }))
    }

    validateCardFields = async (cardFields) => {
        const res = await validateService.validateCardFields(cardFields)
        this.setState(res)

    }
    // End Card Fields Validations

    // Debit Fields Validations
    validateBank = async (bank) => {
        const res = await validateService.validateBank(bank)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                bank: res
            }
        }))
    }

    validateDigit = async (digit) => {
        const res = await validateService.validateDigit(digit)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                verifyingDigit: res
            }
        }))
    }

    validateAccount = async (account) => {
        const res = await validateService.validateAccount(account)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                account: res
            }
        }))
    }

    validateAgency = async (agency) => {
        const res = await validateService.validateAgency(agency)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                agency: res
            }
        }))
    }

    validateDebitFields = async (debitFields) => {
        const res = await validateService.validateDebitFields(debitFields)
        this.setState(res)
    }
    // End Debit Fields Validations

    sendEmail = async () => {
        const leadService = new LeadService()
        const response = await leadService.sendEmail(this.state.email, this.state.name, this.state.id)
        this.setState({ btnDisabled: true })

        if (response.error === false) {
            let successMsg = response.data
            toast.success(successMsg)
            this.setState({ btnDisabled: false, emailSended: true })
        }

        if (response.error === true) {
            let errorMsg = response.message
            toast.error(errorMsg)
            this.setState({ btnDisabled: false, emailSended: false })
        }
    }

    render() {
        if (this.state.product && this.state.product.id && this.state.product.value) {
            return (
                <div>
                    <Steps step={ this.state.step } stepDisabled={ this.state.stepDisabled } id={ this.state.id } />
                    <ToastContainer position="bottom-center" autoClose={ this.state.hasOperator ? false : 5000 } hideProgressBar={ false } newestOnTop closeOnClick={ false } rtl={ false } pauseOnVisibilityChange={ false } draggable={ false } pauseOnHover={ false } />
                    <div className="container-fluid col-11 col-sm-10">
                        <div className="row justify-content-center d-flex align-items-center">
                            <span className="payment-title">Método de pagamento:</span>
                        </div>
                        <div className="row-div"></div>
                        <Tabs className="payment-tabs row justify-content-center d-flex align-items-center"
                            id="controlled-tab-example"
                            defaultActiveKey={ this.state.paymentType }
                            activeKey={ this.state.key }
                            onSelect={ key => this.setState({ key }) }>

                            <Tab title="Cartão de crédito" eventKey="credit" disabled={ this.state.hasSale }>
                                <PaymentResume coverage={ this.state.coverage } productValue={ this.state.productValue } collapseData={ this.state.collapseData } hasSale={ this.state.hasSale } parcel={ this.state.parcel } onChange={ this.handleParcelChange }></PaymentResume>
                                <div className="row justify-content-center d-flex align-items-center">
                                    <span className="form-box-title payment">DADOS PARA PAGAMENTO</span>
                                </div>

                                {/* PAGAMENTO COM CARTÃO DE CRÉDITO */ }
                                <form autoComplete="off">
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="col-12 col-xl-4 col-lg-4 col-md-5 col-sm-10">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <CreditCardInput
                                                        cardNumberInputProps={ {
                                                            value: this.state.cardNumber,
                                                            onChangeCapture: (e) => this.validateCardNumber(e.target.value),
                                                            onChange: (e) => this.setState({ cardNumber: e.target.value })
                                                        } }
                                                        fieldClassName={ 'form-control ' + this.state.classValidate.cardNumber }
                                                        customTextLabels={ {
                                                            invalidCardNumber: 'Cartão inválido. Digite novamente.',
                                                            cardNumberPlaceholder: 'Número do cartão'
                                                        } } />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-4 col-lg-4 col-md-5 col-sm-10">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input id="cardName" name="name" type="text" className={ 'form-control ' + this.state.classValidate.clientName } placeholder="Nome do titular" value={ this.state.clientName }
                                                        disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateName(e.target.value)
                                                            this.setState({ clientName: e.target.value.toUpperCase().replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.' ]/gi, '') })
                                                        } } />
                                                    <img className="img-input-payment" src={ baselinePeople } alt="Nome completo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center ">
                                        <div className="col-xl-2 col-lg-3 col-md-4 col-6 col-sm-5 payment-form">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <MaskedInput id="expiring-date" placeholder="Validade" name="expiring-date" className={ 'form-control ' + this.state.classValidate.expiringDate }
                                                        mask={ [/[0-9]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] } guide={ false } value={ this.state.expiringDate } type="tel" disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateExpingDate(e.target.value)
                                                            this.setState({ expiringDate: e.target.value })
                                                        } } />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-2 col-lg-1 col-md-2 col-6 col-sm-5 security-code">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <MaskedInput id="security-code" type="tel" name="security-code" className={ 'form-control ' + this.state.classValidate.cardCvc } placeholder="CVC"
                                                        mask={ [/[0-9]/, /\d/, /\d/, /\d/] } guide={ false } value={ this.state.cardCvc } disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateCardCvc(e.target.value)
                                                            this.setState({ cardCvc: e.target.value })
                                                        } } />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-4 col-md-4 col-12 col-sm-10" >
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <MaskedInput placeholder="CPF do titular do cartão" id="cardCpf" type="tel" name="cpf" className={ 'form-control ' + this.state.classValidate.clientCpf } mask={ [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/] }
                                                        guide={ false } value={ this.state.clientCpf } disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateCpf(e.target.value)
                                                            this.setState({ clientCpf: e.target.value })
                                                        } } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="col-10 col-lg-3 col-md-5">
                                            <button className={ this.state.btnDisabled || this.state.loadingCredit === true || this.state.hasSale ? "form-button loading" : "form-button" } id="creditCotation" type="button" onClick={ this.creditCardSale } disabled={ this.state.btnDisabled || this.state.hasSale }>
                                                { this.state.loadingCredit === true ? 'AGUARDE...' : 'CONTRATAR' }
                                                {
                                                    this.state.loadingCredit === true ? <div className="spinner-border credit text-danger" role="status"></div> : null
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        this.state.hasOperator ?
                                            <div className="row justify-content-center d-flex align-items-center">
                                                <div className="col-10 col-lg-3 col-md-5">
                                                    <button className={ this.state.btnDisabled || this.state.loadingDebit === true || this.state.hasSale ? "form-button loading mail" : ((this.state.emailSended) ? "form-button mail-success" : "form-button mail") }
                                                        id="sendEmail" type="button"
                                                        onClick={ this.sendEmail }
                                                        disabled={ this.state.btnDisabled || this.state.hasSale }>
                                                        { this.state.btnDisabled === true ? 'AGUARDE...' : ((this.state.emailSended) ? 'ENVIAR EMAIL NOVAMENTE' : 'ENVIAR EMAIL') }
                                                    </button>
                                                </div>
                                            </div> : null
                                    }
                                </form>
                            </Tab>

                            {/* PAGAMENTO COM DEBITO */ }
                            <Tab eventKey="debit" title="Débito em conta" disabled={ this.state.hasSale }>
                                <PaymentResume coverage={ this.state.coverage } productValue={ this.state.productValue } collapseData={ this.state.collapseData } hasSale={ this.state.hasSale } parcel={ this.state.parcel } onChange={ this.handleParcelChange }></PaymentResume>
                                <div className="row justify-content-center d-flex align-items-center">
                                    <span className="form-box-title payment">DADOS PARA PAGAMENTO</span>
                                </div>
                                <form autoComplete="off">
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="col-12 col-xl-4 col-lg-4 col-md-9 col-sm-10">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <select id="bank" className={ 'custom-select ' + this.state.classValidate.bank } defaultValue={ this.state.bank } disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateBank(e.target.value)
                                                            this.setState({ bank: e.target.value })
                                                        } }>
                                                        <option value=''>Selecione seu banco</option>
                                                        {
                                                            this.state.bankList.map((item, i) => {
                                                                return (
                                                                    <option key={ i } value={ `{"code":"${item.cod_banco}","name":"${item.des_banco}"}` }>{ item.des_banco }</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-4 col-lg-4 col-md-9 col-sm-10">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input id="debitName" name="name" type="text" className={ 'form-control ' + this.state.classValidate.clientName } placeholder="Nome completo" value={ this.state.clientName } disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateName(e.target.value)
                                                            this.setState({ clientName: e.target.value.toUpperCase().replace(/[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ.' ]/gi, '') })
                                                        } } />
                                                    <img className="img-input-payment" src={ baselinePeople } alt="Nome completo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center bank-row">
                                        <div className="agency col-xl-3 col-lg-3 col-md-3 col-12 col-sm-10">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <InputMask placeholder="Agência" mask={ this.state.agency ? "999999999" : '' } maskChar={ null } type="tel" id="bank-agency" name="bank-agency" className={ 'form-control ' + this.state.classValidate.agency } value={ this.state.agency } disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateAgency(e.target.value)
                                                            this.setState({ agency: e.target.value })
                                                        } } />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="account col-xl-3 col-lg-3 col-md-3 col-6 col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <InputMask type="tel" placeholder="Conta corrente" id="account" name="account" className={ 'form-control ' + this.state.classValidate.account } mask={ this.state.account ? "999999999999" : '' } maskChar={ null } value={ this.state.account } disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateAccount(e.target.value)
                                                            this.setState({ account: e.target.value })
                                                        } } />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="digit col-xl-2 col-lg-2 col-md-2 col-6 col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input type="text" id="digit" name="digit" className={ 'form-control ' + this.state.classValidate.verifyingDigit } maxLength="1" placeholder="Dígito" value={ this.state.verifyingDigit } disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateDigit(e.target.value)
                                                            this.setState({ verifyingDigit: e.target.value.replace(/[^0-9xX]/gi, '') })
                                                        } } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="col-12 col-xl-8 col-lg-8 col-md-9 col-sm-10" >
                                            <div className="form-group ">
                                                <div className="input-group">
                                                    <MaskedInput placeholder="CPF - Digite o número do seu documento" id="debitCpf" type="tel" name="cpf" className={ 'form-control ' + this.state.classValidate.clientCpf }
                                                        mask={ [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/] } guide={ false } value={ this.state.clientCpf } disabled={ this.state.hasSale } required
                                                        onChange={ (e) => {
                                                            this.validateCpf(e.target.value)
                                                            this.setState({ clientCpf: e.target.value })
                                                        } } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="due-date">
                                            Dia do vencimento:
                                        </div>
                                        <div className="input-group-prepend row justify-content-center d-flex align-items-center">
                                            <input id="fristPayDay" type="button" className={ this.state.payDay === moment().add(5, "d").format("DD") ? "input-group-text" : "input-group-text selected" } onClick={ (e) => this.setState({ payDay: e.target.value }) } value={ moment().add(5, "d").format("DD") } placeholder={ moment().add(5, "d").format("DD") } disabled={ this.state.hasSale }></input>
                                            <input id="secondPayDay" type="button" className={ this.state.payDay === moment().add(10, "d").format("DD") ? "input-group-text" : "input-group-text selected" } onClick={ (e) => this.setState({ payDay: e.target.value }) } value={ moment().add(10, "d").format("DD") } placeholder={ moment().add(10, "d").format("DD") } disabled={ this.state.hasSale }></input>
                                            <input id="thirdPayDay" type="button" className={ this.state.payDay === moment().add(15, "d").format("DD") ? "input-group-text" : "input-group-text selected" } onClick={ (e) => this.setState({ payDay: e.target.value }) } value={ moment().add(15, "d").format("DD") } placeholder={ moment().add(15, "d").format("DD") } disabled={ this.state.hasSale }></input >
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="col-10 col-lg-3 col-md-5">
                                            <button className={ this.state.btnDisabled || this.state.loadingDebit === true || this.state.hasSale ? "form-button payment loading" : "form-button payment" } id="debitCotation" type="button" onClick={ this.automaticDebitSale } disabled={ this.state.btnDisabled || this.state.hasSale }>
                                                { this.state.loadingDebit === true ? 'AGUARDE...' : 'CONTRATAR' }
                                                {
                                                    this.state.loadingDebit === true ? <div className="spinner-border debit text-danger" role="status"></div> : null
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        this.state.hasOperator ?
                                            <div className="row justify-content-center d-flex align-items-center">
                                                <div className="col-10 col-lg-3 col-md-5">
                                                    <button className={ this.state.btnDisabled || this.state.loadingDebit === true || this.state.hasSale ? "form-button loading mail" : ((this.state.emailSended) ? "form-button mail-success" : "form-button mail") }
                                                        id="sendEmail" type="button"
                                                        onClick={ this.sendEmail }
                                                        disabled={ this.state.btnDisabled || this.state.hasSale }>
                                                        { this.state.btnDisabled === true ? 'AGUARDE...' : ((this.state.emailSended) ? 'ENVIAR EMAIL NOVAMENTE' : 'ENVIAR EMAIL') }
                                                    </button>
                                                </div>
                                            </div> : null
                                    }
                                </form>
                            </Tab>
                        </Tabs>
                        <WhatsappChat />
                    </div>
                    <div className="col-12" id="background-footer">
                        <Footer></Footer>
                    </div>
                    <div className="col-12" id="background-copyright">
                        <Copyright></Copyright>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <ToastContainer position="bottom-center" autoClose={ 5000 } hideProgressBar={ false } newestOnTop closeOnClick={ false } rtl={ false } pauseOnVisibilityChange={ false } draggable={ false } pauseOnHover={ false } />
                    <div className="spinner-border init text-danger" role="status"></div>
                </div>
            )
        }
    }

    creditCardSale = async () => {
        try {
            this.setState({ loadingCredit: true, btnDisabled: true })

            this.validateCardFields(this.state)

            var getStyle = this.state.classValidate
            if (getStyle.cardNumber === 'form-input-error' || getStyle.expiringDate !== 'form-input-success' || getStyle.cardCvc !== 'form-input-success' || getStyle.clientCpf !== 'form-input-success' || getStyle.clientName !== 'form-input-success') {
                this.setState({ loadingCredit: false, btnDisabled: false })
            }
            else {
                const typeCard = creditCardType(this.state.cardNumber)[0] || null
                const formatExpiringDate = moment(this.state.expiringDate, 'MM/YYYY')
                const userInfo = {
                    step: parseInt(this.state.step),
                    stepName: this.state.stepName,
                    steps: this.state.leadInfo.steps,

                    idLead: this.state.leadInfo.idLead,

                    idProduct: this.state.leadInfo.idProduct,
                    idIntent: this.state.leadInfo.idIntent,
                    idSale: this.state.leadInfo.idSale,

                    idCustomer: this.state.leadInfo.idCustomer,
                    idContact: this.state.leadInfo.idContact,

                    email: this.state.leadInfo.email || null,
                    phone: this.state.leadInfo.phone || null,

                    customer: this.state.leadInfo.customer,
                    operator: this.state.leadInfo.operator,

                    address: {
                        stateUf: this.state.leadInfo.address.stateUf || null,
                        state: this.state.leadInfo.address.state || null,
                        city: this.state.leadInfo.address.city || null,
                        zipcode: this.state.leadInfo.address.zipcode || null,
                        street: this.state.leadInfo.address.street || null,
                        number: this.state.leadInfo.address.number || null,
                        complement: this.state.leadInfo.address.complement || null,
                        neighborhood: this.state.leadInfo.address.neighborhood || null,
                    },

                    payment: {
                        paymentType: 'credit',
                        clientName: this.state.clientName || null,
                        clientCpf: this.state.clientCpf || null,
                        valueWithInstallment: parseFloat(this.state.value.slice(this.state.value.search("/") + 1)) || null,
                        numberOfInstallments: this.state.parcel,
                        cardNumber: this.state.cardNumber || null,
                        expiringDate: formatExpiringDate.format('MM/YYYY') || null,
                        // cardCvc: this.state.cardCvc || null,
                        cardType: (typeCard) ? typeCard.niceType : null
                    }
                }

                const leadService = new LeadService()
                const getUpdate = await leadService.update(this.state.id, userInfo)

                if (getUpdate && getUpdate.error === true && getUpdate.message) {
                    toast.error(getUpdate.message)
                    this.setState(prevState => ({
                        classValidate: {
                            ...prevState.classValidate,
                            cardNumber: 'form-input-error'
                        }
                    }))
                }
                else {
                    localStorage.removeItem('segureAiId')
                    window.location.href = `/checkout/success/6/${this.state.id}`
                }
            }
        }
        catch (err) {
            console.log(err)
            toast.error("Ops, algo de errado aconteceu! Tente novamente mais tarde :)")
        }
        finally {
            this.setState({ loadingCredit: false, btnDisabled: false })
        }
    }

    automaticDebitSale = async () => {
        try {
            this.setState({ loadingDebit: true, btnDisabled: true })

            this.validateDebitFields(this.state)

            var getStyle = this.state.classValidate
            if (getStyle.bank !== 'form-select-success' || getStyle.clientName !== 'form-input-success' || getStyle.agency !== 'form-input-success' || getStyle.account !== 'form-input-success' || getStyle.clientCpf !== 'form-input-success' || getStyle.verifyingDigit !== 'form-input-success') {
                this.setState({ loadingCredit: false, btnDisabled: false })
            }
            else {
                const userInfo = {
                    step: this.state.step,
                    stepName: this.state.stepName,
                    steps: this.state.leadInfo.steps,

                    idLead: this.state.leadInfo.idLead,

                    idProduct: this.state.leadInfo.idProduct,
                    idIntent: this.state.leadInfo.idIntent,
                    idSale: this.state.leadInfo.idSale,

                    idCustomer: this.state.leadInfo.idCustomer,
                    idContact: this.state.leadInfo.idContact,

                    email: this.state.leadInfo.email || null,
                    phone: this.state.leadInfo.phone || null,

                    operator: this.state.leadInfo.operator,
                    customer: this.state.leadInfo.customer,

                    address: {
                        stateUf: this.state.leadInfo.address.stateUf || null,
                        state: this.state.leadInfo.address.state || null,
                        city: this.state.leadInfo.address.city || null,
                        zipcode: this.state.leadInfo.address.zipcode || null,
                        street: this.state.leadInfo.address.street || null,
                        number: this.state.leadInfo.address.number || null,
                        complement: this.state.leadInfo.address.complement || null,
                        neighborhood: this.state.leadInfo.address.neighborhood || null,
                    },

                    payment: {
                        paymentType: 'debit',
                        valueWithInstallment: parseFloat(this.state.value.slice(this.state.value.search("/") + 1)) || null,
                        numberOfInstallments: this.state.parcel,
                        clientName: this.state.clientName || null,
                        clientCpf: this.state.clientCpf || null,
                        payDay: this.state.payDay || null,
                        bank: JSON.parse(this.state.bank) || null,
                        agency: this.state.agency || null,
                        account: this.state.account || null,
                        verifyingDigit: this.state.verifyingDigit || null
                    }
                }

                const leadService = new LeadService()
                const getUpdate = await leadService.update(this.state.id, userInfo)

                if (getUpdate && getUpdate.error === true && getUpdate.message) {
                    toast.error(getUpdate.message)
                    this.setState(prevState => ({
                        classValidate: {
                            ...prevState.classValidate,
                            cardNumber: 'form-input-error'
                        }
                    }))
                }
                else {
                    localStorage.removeItem('segureAiId')
                    window.location.href = `/checkout/success/6/${this.state.id}`
                }
            }
        }
        catch (err) {
            console.log(err)
            toast.error("Ops, algo de errado aconteceu! Tente novamente mais tarde :)")
        }
        finally {
            this.setState({ loadingDebit: false, btnDisabled: false })
        }
    }
}

export default Payment
