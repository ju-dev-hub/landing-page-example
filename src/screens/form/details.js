import React, { Component } from 'react'

// Import Components
import Footer from '../../components/footer'
import Copyright from '../../components/copyright'
import WhatsappChat from '../../components/whatsapp'
import LeadResume from '../../components/lead-resume'
import Steps from '../../components/steps'

// Import Services
import LeadService from '../../redux/lead_service'
import ListService from '../../redux/list_service'
import FieldValidation from '../../redux/field_validation'

// Import Libs
import MaskedInput from 'react-text-mask'
import InputMask from 'react-input-mask'
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from "react-toastify"
import TagManager from 'react-gtm-module'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

// Import CSS Files
import '../../style/desktop.css'
import '../../style/tablet.css'
import '../../style/mobile.css'

const validateService = new FieldValidation()

class FormDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validation: '',
            inputValidation: '',
            step: 4,
            stepName: 'endereco',
            stepDisabled: '',
            name: '',
            birthday: '',
            gender: "M",
            maritalStatus: "",
            cpf: "",
            rg: "",
            issuingAgency: "",
            phone: "",
            coverage: "",
            productValue: "",
            leadInfo: {},
            leadQuote: {},
            loading: false,
            btnDisabled: false,
            value: 1,
            inputRG: '',
            monthlyIncomeValue: 1,
            monthlyIncome: `{"code": "1","name": "não informado"}`,
            media: {},
            classValidate: {
                rg: 'form-input',
                issuingAgency: 'form-select',
                cpf: 'form-input',
                maritalStatus: 'form-select',
                birthday: 'form-input',
                phone: 'form-input',
            },

            id: this.props.match.params.id,
            routerCoverage: `/contract/coverage/2/${this.props.match.params.id}`
        }
    }

    UNSAFE_componentWillMount = async () => {
        TagManager.initialize({ gtmId: 'GTM-TK67XL3' })

        this.maritalStatusList()
        this.monthlyIncomeList()
        this.issuingAgencyList()
        await this.getLead()
    }

    getLead = async () => {
        try {
            const getId = this.state.id
            const leadService = new LeadService()
            const res = await leadService.findLead(getId)

            if (res && res.data && res.data._id && res.data.customer) {
                this.setState({
                    media: res.data.media && res.data.media.id ? res.data.media : { "id": 50, "name": "Formulário" },
                    hasSale: res.data.batata.sended,
                    leadInfo: res.data,
                    name: res.data.customer.name,
                    coverage: res.data.coverage,
                    stepDisabled: 'details',
                    productValue: res.data.productValue,
                    maritalStatus: (res.data.customer.maritalStatus && res.data.customer.maritalStatus.code) ? JSON.stringify(res.data.customer.maritalStatus) : '',
                    phone: res.data.phone || '',
                    monthlyIncomeValue: (res.data.customer.monthlyIncome && res.data.customer.monthlyIncome.code) ? Number(res.data.customer.monthlyIncome.code) : 1,
                    monthlyIncome: (res.data.customer.monthlyIncome) ? JSON.stringify(res.data.customer.monthlyIncome) : `{"code": "1","name": "não informado"}`,
                    birthday: res.data.customer.birthday || "",
                    cpf: res.data.customer.cpf || "",
                    rg: res.data.customer.rg || "",
                    issuingAgency: (res.data.customer.issuingAgency && res.data.customer.issuingAgency.code) ? JSON.stringify(res.data.customer.issuingAgency) : '',
                    gender: res.data.customer.gender || "M"
                })
            }
            else {
                toast.error('Ocorreu um erro. Você será redirecionado para a tela inicial. Faça a sua cotação novamente.')
                setTimeout(() => window.location.href = '/', 5000)
            }
            this.validateIssuingAgency(this.state.issuingAgency)
            this.validateCPF(this.state.cpf)
            this.validateRG(this.state.rg)
            this.validateMaritalStatus(this.state.maritalStatus)
            this.validateBirthday(this.state.birthday)
            this.validatePhone(this.state.phone)
        }
        catch (err) {
            toast.error('Ocorreu um erro. Você será redirecionado para a tela inicial. Faça a sua cotação novamente.')
            setTimeout(() => window.location.href = '/', 5000)
            console.log(err)
        }
    }

    maritalStatusList = async () => {
        try {
            const maritalStatusList = new ListService()
            const res = await maritalStatusList.maritalStatusList()
            if (res && res.data && res.error === false) {
                this.setState({ maritalStatusList: res.data })
            }
            else {
                toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Selecione o seu plano novamente.')
                setTimeout(() => window.location.href = this.state.routerCoverage, 5000)
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Selecione o seu plano novamente.')
            setTimeout(() => window.location.href = this.state.routerCoverage, 5000)
            console.log(err)
        }
    }

    formatMonthlyIncome = (text) => {
        if (text.indexOf("Não informado") !== -1) {
            text = text.replace("Não informado", "")
        }
        else if (text.indexOf("à") !== -1) {
            text = text.substring(text.indexOf("à ")).replace("à ", "até ").replace("R$", "").replace(",00", "")
        }
        else if (text.indexOf("Mais") === 0) {
            text = text.substring(text.indexOf("Mais")).replace("Mais", "+").replace("R$", "").replace(",00", "")
        }
        else if (text.indexOf("Até") === 0) {
            text = text.substring(text.indexOf("Até ")).replace("Até ", "até ").replace("R$", "").replace(",00", "")
        }
        return text
    }

    monthlyIncomeList = async () => {
        try {
            const monthlyIncomeList = new ListService()
            const res = await monthlyIncomeList.monthlyIncomeList()
            if (res && res.data && res.error === false) {
                let monthlyIncomeList = []

                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].des_renda_mensal = this.formatMonthlyIncome(res.data[i].des_renda_mensal)
                    monthlyIncomeList.push(res.data[i])
                }

                this.setState({ monthlyIncomeList: monthlyIncomeList })

                if (this.state.monthlyIncomeValue === 1) {
                    this.setState({
                        monthlyIncome: `{"code":"${monthlyIncomeList[0].cod_renda_mensal}","name":"${monthlyIncomeList[0].des_renda_mensal}"}`
                    })
                }
            }
            else {
                toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Tente selecionar o seu plano novamente.')
                setTimeout(() => window.location.href = this.state.routerCoverage, 5000)
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Tente selecionar o seu plano novamente.')
            setTimeout(() => window.location.href = this.state.routerCoverage, 5000)
            console.log(err)
        }
    }

    getMonthlyIncome = (value) => {
        this.setState({ monthlyIncomeValue: value })
        let monthlyIncome = {}

        switch (value) {
            case 1:
                monthlyIncome = this.state.monthlyIncomeList[0]
                break
            case 2:
                monthlyIncome = this.state.monthlyIncomeList[1]
                break
            case 3:
                monthlyIncome = this.state.monthlyIncomeList[2]
                break
            case 4:
                monthlyIncome = this.state.monthlyIncomeList[3]
                break
            case 5:
                monthlyIncome = this.state.monthlyIncomeList[4]
                break
            case 6:
                monthlyIncome = this.state.monthlyIncomeList[5]
                break;
            case 7:
                monthlyIncome = this.state.monthlyIncomeList[6]
                break;
            default:
                monthlyIncome = this.state.monthlyIncomeList[0]
                break
        }
        this.setState({ monthlyIncome: `{"code":"${monthlyIncome.cod_renda_mensal}","name":"${monthlyIncome.des_renda_mensal}"}` })
    }

    issuingAgencyList = async () => {
        try {
            const issuingAgencyList = new ListService()
            const res = await issuingAgencyList.issuingAgencyList()
            if (res && res.data && res.error === false) {
                this.setState({ issuingAgencyList: res.data })
            }
            else {
                toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Tente selecionar o seu plano novamente.')
                setTimeout(() => window.location.href = this.state.routerCoverage, 5000)
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Tente selecionar o seu plano novamente.')
            setTimeout(() => window.location.href = this.state.routerCoverage, 5000)
            console.log(err)
        }
    }

    // Fields Validations
    validateIssuingAgency = async (issuingAgency) => {
        const res = await validateService.validateIssuingAgency(issuingAgency)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                issuingAgency: res
            }
        }))
    }

    validateCPF = async (cpf) => {
        const res = await validateService.validateCpf(cpf)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                cpf: res
            }
        }))
    }

    validateRG = async (rg) => {
        const res = await validateService.validateRG(rg)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                rg: res
            }
        }))
        if (rg.length === 8) {
            this.setState({ inputRG: 'handleMask-8' })
        }
        if (rg.length === 9) {
            this.setState({ inputRG: 'handleMask-9' })
        }
        if (rg.length !== 9 && rg.length !== 8) {
            this.setState({ inputRG: '' })
        }
    }

    validateMaritalStatus = async (maritalStatus) => {
        const res = await validateService.validateMaritalStatus(maritalStatus)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                maritalStatus: res
            }
        }))
    }

    validateBirthday = async (birth) => {
        const res = await validateService.validateBirthday(birth)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                birthday: res
            }
        }))
    }

    validatePhone = async (phone) => {
        const res = await validateService.validatePhone(phone)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                phone: res
            }
        }))
    }

    validateDetailsFields = async (details) => {
        const res = await validateService.validateDetailsFields(details)
        this.setState(res)
    }
    // End Fields Validations 

    render() {
        if (this.state.leadInfo && this.state.leadInfo._id && this.state.maritalStatusList && this.state.monthlyIncomeList && this.state.issuingAgencyList) {
            return (
                <div>
                    <Steps step={ this.state.step } stepDisabled={ this.state.stepDisabled } id={ this.state.id } />
                    <ToastContainer position="bottom-center" autoClose={ 5000 } hideProgressBar={ false } newestOnTop closeOnClick={ false } rtl={ false } pauseOnVisibilityChange={ false } draggable={ false } pauseOnHover={ false } />
                    <LeadResume name={ this.state.name } coverage={ this.state.coverage } productValue={ this.state.productValue } />
                    <div className="row justify-content-center d-flex align-items-center">
                        <div className="container-fluid">
                            <div className="row justify-content-center d-flex align-items-center">
                                <span className="form-box-title">COMPLETE OS DADOS ABAIXO:</span>
                            </div>
                            <form autoComplete="off" className="details-form">
                                <div className="row justify-content-center d-flex align-items-center details-input">
                                    <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10" >
                                        <div className="form-group">
                                            <div className="input-group">
                                                {
                                                    this.state.inputRG === "handleMask-8" ?
                                                        <MaskedInput id="rg" placeholder="RG - Digite somente os números" name="rg" mask={ [/[0-9]/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] }
                                                            guide={ false } keepCharPositions={ true } type="tel" className={ 'form-control ' + this.state.classValidate.rg } value={ this.state.rg } disabled={ this.state.hasSale } required
                                                            onChange={ (e) => {
                                                                this.validateRG(e.target.value)
                                                                this.setState({ rg: e.target.value })
                                                            } } />
                                                        :
                                                        this.state.inputRG === "handleMask-9" ?
                                                            <MaskedInput id="rg" placeholder="RG - Digite somente os números" name="rg" mask={ [/[0-9]/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/] }
                                                                guide={ false } keepCharPositions={ true } type="tel" className={ 'form-control ' + this.state.classValidate.rg } value={ this.state.rg } disabled={ this.state.hasSale } required
                                                                onChange={ (e) => {
                                                                    this.validateRG(e.target.value)
                                                                    this.setState({ rg: e.target.value })
                                                                } } />
                                                            :
                                                            <MaskedInput
                                                                id="rg" placeholder="RG - Digite somente os números" name="rg" mask={ [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] }
                                                                guide={ false } keepCharPositions={ true } type="tel" className={ 'form-control ' + this.state.classValidate.rg } value={ this.state.rg } disabled={ this.state.hasSale } required
                                                                onChange={ (e) => {
                                                                    this.validateRG(e.target.value)
                                                                    this.setState({ rg: e.target.value })
                                                                } } />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10" >
                                        <div className="form-group">
                                            <div className="input-group">
                                                <select id="orgao-emissor" className={ 'custom-select ' + this.state.classValidate.issuingAgency } defaultValue={ this.state.issuingAgency } disabled={ this.state.hasSale } required
                                                    onChange={ (e) => {
                                                        this.validateIssuingAgency(e.target.value)
                                                        this.setState({ issuingAgency: e.target.value })
                                                    } }>
                                                    <option value="">Órgão emissor</option>
                                                    {
                                                        this.state.issuingAgencyList.map((item, i) => {
                                                            return (
                                                                <option key={ i } value={ `{"code":"${item.cod_orgao_expedidor}","name":"${item.des_orgao_expedidor}"}` }>{ item.des_orgao_expedidor }</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center d-flex align-items-center">
                                    <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10" >
                                        <div className="form-group">
                                            <div className="input-group">
                                                <MaskedInput className={ 'form-control ' + this.state.classValidate.cpf } id="cpf" type="tel" placeholder="CPF" name="cpf" mask={ [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/] }
                                                    value={ this.state.cpf } guide={ false } disabled={ this.state.hasSale } required
                                                    onChange={ (e) => {
                                                        this.validateCPF(e.target.value);
                                                        this.setState({ cpf: e.target.value })
                                                    } }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <select id="maritalStatus" className={ 'custom-select ' + this.state.classValidate.maritalStatus } defaultValue={ this.state.maritalStatus } disabled={ this.state.hasSale } required
                                                    onChange={ (e) => {
                                                        this.validateMaritalStatus(e.target.value)
                                                        this.setState({ maritalStatus: e.target.value })
                                                    } } >
                                                    <option value="">Estado Civil</option>
                                                    {
                                                        this.state.maritalStatusList.map((item, i) => {
                                                            return (
                                                                <option key={ i } value={ `{"code":"${item.cod_estado_civil}","name":"${item.des_estado_civil}"}` }>{ item.des_estado_civil }</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center d-flex align-items-center">
                                    <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10" >
                                        <div className="form-group">
                                            <div className="input-group">
                                                <MaskedInput className={ 'form-control ' + this.state.classValidate.birthday } mask={ [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] } keepCharPositions={ true }
                                                    guide={ false } type="tel" id="birthday" name="birthday" placeholder="Data de nascimento" value={ this.state.birthday } disabled={ this.state.hasSale } required
                                                    onChange={ (e) => {
                                                        this.validateBirthday(e.target.value)
                                                        this.setState({ birthday: e.target.value })
                                                    } } />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10" >
                                        <div className="form-group">
                                            <div className="input-group">
                                                {
                                                    (this.state.phone.replace(/[^0-9]/g, '').charAt(2) === '9' ?
                                                        <InputMask type="tel" id="phone" beforeMaskedValueChange={ this.beforeMaskedValueChange.bind(this) } mask={ this.state.phone ? "(99) 99999-9999" : "" }
                                                            className={ 'form-control ' + this.state.classValidate.phone } placeholder="Telefone" maskChar={ null } disabled={ this.state.hasSale } value={ this.state.phone }
                                                            onChange={ (e) => {
                                                                this.validatePhone(e.target.value);
                                                                this.setState({ phone: e.target.value })
                                                            } } /> :
                                                        <InputMask type="tel" id="phone" disabled={ this.state.hasSale } beforeMaskedValueChange={ this.beforeMaskedValueChange.bind(this) } mask={ this.state.phone ? "(99) 9999-9999" : "" }
                                                            className={ 'form-control ' + this.state.classValidate.phone } placeholder="Telefone" maskChar={ null } value={ this.state.phone }
                                                            onChange={ (e) => {
                                                                this.validatePhone(e.target.value);
                                                                this.setState({ phone: e.target.value })
                                                            } } />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center d-flex align-items-center">
                                    <div className="gender">
                                        <div className="row justify-content-center d-flex align-items-center gender-mobile">
                                            <div className="col-5 col-lg-3 col-md-3 col-sm-5">
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input id="customRadioInline2" type="radio" name="customRadioInline1" className="custom-control-input" value="M" checked={ this.state.gender === "M" } disabled={ this.state.hasSale }
                                                        onChange={ (e) => this.setState({ gender: e.target.value.toUpperCase() }) }>
                                                    </input>
                                                    <label className={ this.state.gender === "M" ? "custom-control-label gender-active" : "custom-control-label gender-inactive" } htmlFor="customRadioInline2">Masculino</label>
                                                </div>
                                            </div>
                                            <div className="col-5 col-lg-3 col-md-3 col-sm-5">
                                                <div className="custom-control custom-radio custom-control-inline">
                                                    <input id="customRadioInline1" type="radio" name="customRadioInline1" className="custom-control-input" value="F" checked={ this.state.gender === "F" } disabled={ this.state.hasSale }
                                                        onChange={ (e) => this.setState({ gender: e.target.value.toUpperCase() }) }>
                                                    </input>
                                                    <label className={ this.state.gender === "F" ? "custom-control-label gender-active" : "custom-control-label gender-inactive" } htmlFor="customRadioInline1">Feminino</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center d-flex align-items-center">
                                    <span className="monthlyIncome">Qual é sua renda familiar?</span>
                                </div>
                                <div className="row justify-content-center d-flex align-items-center">
                                    <InputRange
                                        maxValue={ 7 }
                                        minValue={ 1 }
                                        value={ this.state.monthlyIncomeValue }
                                        onChange={ (value) => this.getMonthlyIncome(value) }
                                        disabled={ this.state.hasSale } />
                                </div>
                                <div className="row justify-content-center d-flex align-items-center monthlyIncome-row">
                                    {
                                        this.state.monthlyIncomeList.map((item, i) => {
                                            return (
                                                <span className="monthlyIncomeList" key={ i } value={ `{"code":"${item.cod_renda_mensal}","name":"${item.des_renda_mensal}"}` }>{ item.des_renda_mensal }</span>
                                            )
                                        })
                                    }
                                </div>
                                <div className="row justify-content-center d-flex align-items-center">
                                    <div className="col-10 col-lg-3 col-md-5">
                                        <button className={ this.state.loading === true ? "form-button loading" : "form-button" } id="btnDetails" type="button" onClick={ this.createCustomer } disabled={ this.state.btnDisabled }>
                                            { this.state.loading === true ? 'AGUARDE...' : 'PROSSEGUIR' }
                                            {
                                                this.state.loading === true ? <div className="spinner-border details text-danger" role="status" /> : null
                                            }
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <WhatsappChat />
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

    createCustomer = async () => {
        try {
            this.setState({ loading: true, btnDisabled: true })

            this.validateDetailsFields(this.state)

            var getStyle = this.state.classValidate
            if (getStyle.rg !== 'form-input-success' || getStyle.phone !== 'form-input-success' || getStyle.issuingAgency !== 'form-input-success' || getStyle.maritalStatus !== 'form-input-success' || getStyle.birthday !== 'form-input-success' || getStyle.cpf !== 'form-input-success' || this.state.monthlyIncomeValue === 1) {
                this.setState({ loading: false, btnDisabled: false })
            }

            else {
                const userInfo = {
                    step: this.state.step,
                    stepName: this.state.stepName,
                    steps: this.state.leadInfo.steps,

                    idLead: this.state.leadInfo.idLead,

                    idProduct: this.state.leadInfo.idProduct,
                    idCustomer: this.state.leadInfo.idCustomer,
                    idContact: this.state.leadInfo.idContact,
                    operator: this.state.leadInfo.operator,
                    media: this.state.media,

                    email: this.state.leadInfo.email,

                    phone: this.state.phone,

                    customer: {
                        name: this.state.leadInfo.customer.name,
                        cpf: this.state.cpf,
                        rg: this.state.rg,
                        birthday: this.state.birthday,
                        issuingAgency: (this.state.issuingAgency) ? JSON.parse(this.state.issuingAgency) : null,
                        maritalStatus: (this.state.maritalStatus) ? JSON.parse(this.state.maritalStatus) : null,
                        monthlyIncome: (this.state.monthlyIncome) ? JSON.parse(this.state.monthlyIncome) : null,
                        gender: this.state.gender
                    }
                }

                const leadService = new LeadService()
                await leadService.update(this.props.match.params.id, userInfo)
                    .then(res => {
                        if (res.error === false) {
                            window.location.href = `/form/address/4/${this.props.match.params.id}`
                        } else {
                            this.setState({ loading: false, btnDisabled: false })
                            if (res.message) {
                                toast.error(res.message)
                            }
                        }
                    })
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro! Tente avançar novamente. Se o erro persistir, aguarde alguns instantes.')
            this.setState({ loading: false, btnDisabled: false })
            console.log(err)
        }
    }
}

export default FormDetails
