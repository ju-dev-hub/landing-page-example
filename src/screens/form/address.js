import React, { Component } from 'react'

// Import Service
import LeadService from '../../redux/lead_service'
import FieldValidation from '../../redux/field_validation'

// Import Libs
import 'react-toastify/dist/ReactToastify.min.css'
import { toast, ToastContainer } from 'react-toastify'
import TagManager from 'react-gtm-module'

// Import Components
import Footer from '../../components/footer'
import Copyright from '../../components/copyright'
import WhatsappChat from '../../components/whatsapp'
import LeadResume from '../../components/lead-resume'
import Steps from '../../components/steps'
import InputMask from 'react-input-mask'
import MaskedInput from 'react-text-mask'

// Import CSS Files
import '../../style/desktop.css'
import '../../style/tablet.css'
import '../../style/mobile.css'

const validateService = new FieldValidation()

class FormAddress extends Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 5,
            stepName: 'dados-pagamento',
            stepDisabled: '',
            street: '',
            neighborhood: '',
            number: '',
            complement: '',
            city: '',
            state: '',
            zipcode: '',
            name: '',
            coverage: '',
            productValue: '',

            classValidate: {
                zipcode: 'form-input',
                street: 'form-input',
                number: 'form-input',
                neighborhood: 'form-input',
                city: 'form-input',
                state: 'form-input',
                complement: 'form-input'
            },

            loadingZipcode: false,
            loading: false,
            disabled: false,
            btnDisabled: false,
            zipCodeGeneral: false,
            leadInfo: {},

            id: this.props.match.params.id,
            routerDetails: `/form/details/3/${this.props.match.params.id}`
        }
    }

    UNSAFE_componentWillMount() {
        TagManager.initialize({ gtmId: 'GTM-TK67XL3' })
        this.getLead()
    }

    getLead = async () => {
        try {
            const getId = this.state.id
            const leadService = new LeadService()
            const res = await leadService.findLead(getId)

            if (res && res.data && res.error === false) {
                this.setState({
                    hasSale: res.data.batata.sended,
                    leadInfo: res.data,
                    street: res.data.address.street || '',
                    neighborhood: res.data.address.neighborhood || '',
                    number: res.data.address.number || '',
                    complement: res.data.address.complement || '',
                    city: res.data.address.city || '',
                    state: res.data.address.state || '',
                    stateUf: res.data.address.stateUf || '',
                    zipcode: res.data.address.zipcode || '',
                    name: res.data.customer.name || '',
                    coverage: res.data.coverage || '',
                    productValue: res.data.productValue || '',
                    stepDisabled: 'address'
                })
            }
            else {
                toast.error('Ocorreu um erro! Você será redirecionado para a tela inicial. Faça a sua cotação novamente.')
                setTimeout(() => window.location.href = '/', 5000)
            }
            this.validateNumber(this.state.number)
            this.validateComplement(this.state.complement)
            this.validateStreet(this.state.street)
            this.validateNeighborhood(this.state.neighborhood)
            this.validateZipcode(this.state.zipcode)
        }
        catch (err) {
            toast.error('Ocorreu um erro! Você será redirecionado para a tela anterior. Preencha seus dados a avance novamente.')
            setTimeout(() => window.location.href = this.state.routerDetails, 5000)
            console.log(err)
        }
    }

    // Fields Validations
    validateZipcode = async (zipcode) => {
        const res = await validateService.validateZipcode(zipcode)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                zipcode: res
            }
        }))
    }

    validateComplement = async (complement) => {
        const res = await validateService.validateComplement(complement)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                complement: res
            }
        }))
    }

    validateNumber = async (number) => {
        const res = await validateService.validateNumber(number)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                number: res
            }
        }))
    }

    validateStreet = async (street) => {
        const res = await validateService.validateStreet(street)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                street: res
            }
        }))
    }

    validateNeighborhood = async (neighborhood) => {
        const res = await validateService.validateNeighborhood(neighborhood)
        this.setState(prevState => ({
            classValidate: {
                ...prevState.classValidate,
                neighborhood: res
            }
        }))
    }

    validateAddressFields = async (address) => {
        const res = await validateService.validateAddressFields(address)
        this.setState(res)
    }
    // End Fields Validations

    render() {
        if (this.state.leadInfo && this.state.leadInfo._id) {
            return (
                <div>
                    <Steps step={this.state.step} stepDisabled={this.state.stepDisabled} id={this.state.id} />
                    <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick={false} rtl={false} pauseOnVisibilityChange={false} draggable={false} pauseOnHover={false} />
                    <LeadResume name={this.state.name} coverage={this.state.coverage} productValue={this.state.productValue} />
                    <div className="row justify-content-center d-flex align-items-center">
                        <div className="container-fluid">
                            <div className="row justify-content-center d-flex align-items-center">
                                <span className="form-box-title">COMPLETE OS DADOS ABAIXO:</span>
                            </div>
                            <form autoComplete="off">
                                <div className="row justify-content-center d-flex align-items-center">
                                    <div className="col-12 col-xl-6 col-lg-8 col-md-8 col-sm-10" >
                                        <div className="form-group">
                                            <div className="input-group">
                                                <MaskedInput id="zipcode" placeholder="Informe o seu CEP" name="zipcode" type="tel" mask={[/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} keepCharPositions={true} guide={false}
                                                    className={'form-control ' + this.state.classValidate.zipcode} value={this.state.zipcode} disabled={this.state.hasSale} required
                                                    onChange={(e) => {
                                                        this.searchAddress(e.target.value)
                                                        this.setState({ zipcode: e.target.value })
                                                    }} />
                                                {
                                                    this.state.loadingZipcode === true ? <div className="spinner-border zipcode text-danger" role="status"></div> : null
                                                }
                                                <div className="col-12">
                                                    <a className="link-zipcode" href="http://www.buscacep.correios.com.br/sistemas/buscacep/buscaCepEndereco.cfm" target="_blank" rel="noopener noreferrer">Não sei meu CEP</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ZIPCODE FOUND */}
                                <div className={this.state.zipCodeGeneral ? "zipcode-notFound" : ""}>
                                    <div className="row justify-content-center d-flex align-items-center address-form">
                                        <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-5">
                                            <div className="form-group">
                                                <input type="text" className="text-truncate form-control input-address" id="inputStreet" placeholder="Rua:" disabled value={this.state.street} required
                                                    onChange={(e) => this.setState({ street: e.target.value })} />
                                                {
                                                    this.state.street ? <div className="zipcode-found-address">Rua </div> : null
                                                }
                                            </div>
                                        </div>
                                        <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-5">
                                            <div className="form-group">
                                                <input type="text" className="text-truncate form-control input-address" id="inputCity" placeholder="Cidade:" value={this.state.city} disabled required
                                                    onChange={(e) => this.setState({ city: e.target.value })} />
                                                {
                                                    this.state.city ? <div className="zipcode-found-address">Cidade</div> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center address-group">
                                        <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-5">
                                            <div className="form-group">
                                                <input type="text" className="text-truncate form-control input-address" id="inputNeighborhood" placeholder="Bairro:" value={this.state.neighborhood} disabled required
                                                    onChange={(e) => this.setState({ neighborhood: e.target.value })} />
                                                {
                                                    this.state.neighborhood ? <div className="zipcode-found-address">Bairro</div> : null
                                                }
                                            </div>
                                        </div>
                                        <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-5">
                                            <div className="form-group">
                                                <input type="text" className="text-truncate form-control input-address" id="inputState" placeholder="Estado:" value={this.state.state} disabled required
                                                    onChange={(e) => this.setState({ state: e.target.value })} />
                                                {
                                                    this.state.state ? <div className="zipcode-found-address">Estado</div> : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center address-form">
                                        <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <InputMask id="number" placeholder="Número" name="number" className={'text-truncate form-control ' + this.state.classValidate.number} value={this.state.number} type="tel" maskChar={null} mask={this.state.number ? "9999999999999999" : ""} disabled={this.state.disabled || this.state.hasSale} required
                                                        onChange={(e) => {
                                                            this.validateNumber(e.target.value.replace(/[^0-9.]/gi, ''))
                                                            this.setState({ number: e.target.value.replace(/[^0-9.]/gi, '') })
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input id="complemento" type="text" placeholder="Complemento" name="complemento" className={'form-control form-input ' + this.state.classValidate.complement} value={this.state.complement} disabled={this.state.disabled || this.state.hasSale}
                                                        onChange={(e) => {
                                                            this.validateComplement(e.target.value.replace('  ', ''))
                                                            this.setState({ complement: e.target.value.toUpperCase().replace('  ', '') })
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* END ZIPCODE FOUND */}

                                {/* ZIPCODE NOT FOUND */}
                                <div className={this.state.zipCodeGeneral ? "" : "zipcode-notFound"}>
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input id="street" type="text" placeholder="Rua" name="street" className={'form-control ' + this.state.classValidate.street} value={this.state.street} disabled={this.state.disabled || this.state.hasSale} required
                                                        onChange={(e) => {
                                                            this.validateStreet(e.target.value.replace('  ', ''))
                                                            this.setState({ street: e.target.value.replace('  ', '') })
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10" >
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input id="city" type="text" placeholder="Cidade" name="city" className={'form-control ' + this.state.classValidate.city} value={'Cidade: ' + this.state.city} disabled={this.state.disabled || this.state.hasSale || this.state.city || this.state.zipCodeGeneral} required
                                                        onChange={(e) => this.setState({ city: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10" >
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input id="neighborhood" type="text" placeholder="Bairro" name="neighborhood" className={'form-control ' + this.state.classValidate.neighborhood} value={this.state.neighborhood} disabled={this.state.disabled || this.state.hasSale} required
                                                        onChange={(e) => {
                                                            this.validateNeighborhood(e.target.value.replace('  ', ''))
                                                            this.setState({ neighborhood: e.target.value.replace('  ', '') })
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-10" >
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input id="state" type="text" placeholder="Estado" name="state" className={'form-control ' + this.state.classValidate.state} value={'Estado: ' + this.state.state} disabled={this.state.disabled || this.state.hasSale || this.state.state || this.state.zipCodeGeneral}
                                                        required onChange={(e) => this.setState({ state: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center d-flex align-items-center">
                                        <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-5">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <InputMask id="number" placeholder="Número" name="number" className={'form-control ' + this.state.classValidate.number} disabled={this.state.disabled || this.state.hasSale}
                                                        required value={this.state.number} maskChar={null} mask={this.state.number ? "9999999999999999" : ""}
                                                        onChange={(e) => {
                                                            this.validateNumber(e.target.value.replace(/[^0-9.]/gi, ''))
                                                            this.setState({ number: e.target.value.replace(/[^0-9.]/gi, '') })
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-xl-3 col-lg-4 col-md-4 col-sm-5">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input id="complement" type="text" placeholder="Complemento" name="complemento" className={'form-control form-input ' + this.state.classValidate.complement}
                                                        value={this.state.complement} disabled={this.state.disabled || this.state.hasSale}
                                                        onChange={(e) => {
                                                            this.validateComplement(e.target.value.replace('  ', ''))
                                                            this.setState({ complement: e.target.value.toUpperCase().replace('  ', '') })
                                                        }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* END ZIPCODE NOT FOUND */}

                                <div className="row justify-content-center d-flex align-items-center">
                                    <div className="col-10 col-lg-3 col-md-5">
                                        <button className={this.state.loading === true ? "form-button loading" : "form-button"} id="btnAddress" type="button" onClick={this.saveAddress} disabled={this.state.btnDisabled}>
                                            {this.state.loading === true ? 'AGUARDE...' : 'PROSSEGUIR'}
                                            {
                                                this.state.loading === true ? <div className="spinner-border details text-danger" role="status"></div> : null
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
                </div >
            )
        }
        else {
            return (
                <div>
                    <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick={false} rtl={false} pauseOnVisibilityChange={false} draggable={false} pauseOnHover={false} />
                    <div className="spinner-border init text-danger" role="status"></div>
                </div>
            )
        }
    }

    searchAddress = async (zipCode) => {
        const address = {}

        if (zipCode && zipCode.length < 10) {
            this.setState({
                state: '', street: '', city: '', number: '', complement: '', neighborhood: '',
                classValidate: {
                    zipcode: 'form-input',
                    street: 'form-input',
                    number: 'form-input',
                    neighborhood: 'form-input',
                    city: 'form-input',
                    state: 'form-input'
                }
            })
        }

        try {
            if (zipCode && zipCode.length === 10) {
                const leadService = new LeadService()
                this.setState({ loadingZipcode: true })

                const responseAddress = await leadService.getAddress(zipCode, 7707)

                if (!responseAddress || !responseAddress.data) {
                    toast.error("Sistema de busca de CEP indisponível, favor preencher manualmente ou tentar outro CEP")
                    this.state.classValidate.zipcode = 'form-input-error'
                    this.setState({ loadingZipcode: false, disabled: false, state: '', street: '', city: '', number: '', complement: '', neighborhood: '' })

                    return
                }

                if (!responseAddress.data.zipCode || responseAddress.data.zipCode.length === 0) {
                    toast.error(responseAddress.message)
                    this.state.classValidate.zipcode = 'form-input-error'
                    this.setState({ loadingZipcode: false, disabled: false, state: '', street: '', city: '', number: '', complement: '', neighborhood: '' })

                    return
                }

                this.setState({
                    zipCodeGeneral: false,
                    disabled: false,
                    loadingZipcode: false,
                    street: responseAddress.data.street || '',
                    neighborhood: responseAddress.data.neighborhood || '',
                    city: (responseAddress.data.city) ? responseAddress.data.city.name : '',
                    state: (responseAddress.data.state) ? responseAddress.data.state.name : '',
                    stateUf: (responseAddress.data.state) ? responseAddress.data.state.uf : '',
                    number: responseAddress.data.number || '',
                    complement: responseAddress.data.complement || '',
                    classValidate: {
                        zipcode: 'form-input-success',
                        street: 'form-input-success',
                        neighborhood: 'form-input-success',
                        city: 'form-input-success',
                        state: 'form-input-success',
                        number: 'form-input'
                    }
                })

                if (responseAddress.data.isGeneral) {
                    this.setState({
                        zipCodeGeneral: true,
                        classValidate: {
                            zipcode: 'form-input-success',
                            street: 'form-input',
                            neighborhood: 'form-input',
                            city: 'form-input-success',
                            state: 'form-input-success',
                            number: 'form-input'
                        }
                    })
                }

                return address
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro ao buscar o seu endereço. Verifique o CEP digitado.')
            this.state.classValidate.zipcode = 'form-input-error'
            this.setState({ loadingZipcode: false, disabled: false })
            console.log(err)
        }
    }

    saveAddress = async () => {
        try {
            this.setState({ loading: true, btnDisabled: true })

            this.validateAddressFields(this.state)

            var getStyle = this.state.classValidate
            if (getStyle.zipcode !== 'form-input-success' || getStyle.number !== 'form-input-success' || getStyle.street === 'form-input-error' || getStyle.neighborhood === 'form-input-error' || getStyle.city === 'form-input-error' || getStyle.state === 'form-input-error') {
                this.setState({ loading: false, btnDisabled: false })
            }
            else {
                const userInfo = {
                    step: parseInt(this.state.step),
                    stepName: this.state.stepName,
                    steps: this.state.leadInfo.steps,

                    idLead: this.state.leadInfo.idLead,

                    idCustomer: this.state.leadInfo.idCustomer,
                    idContact: this.state.leadInfo.idContact,
                    idIntent: this.state.leadInfo.idIntent,

                    operator: this.state.leadInfo.operator,

                    email: this.state.leadInfo.email || null,
                    phone: this.state.leadInfo.phone || null,

                    address: {
                        street: this.state.street,
                        neighborhood: this.state.neighborhood,
                        number: this.state.number,
                        complement: this.state.complement,
                        city: this.state.city,
                        state: this.state.state,
                        stateUf: this.state.stateUf,
                        zipcode: this.state.zipcode
                    }
                }

                const leadService = new LeadService()
                await leadService.update(this.props.match.params.id, userInfo)
                window.location.href = `/checkout/payment/5/${this.props.match.params.id}`
            }
        }
        catch (err) {
            toast.error('Ocorreu um erro! Tente avançar novamente. Se o erro persistir, aguarde alguns instantes.')
            this.setState({ loading: false, btnDisabled: false })
            console.log(err)
        }
    }
}

export default FormAddress
