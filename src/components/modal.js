import React, { Component } from 'react'
import LeadService from '../redux/lead_service'
import { toast } from "react-toastify"

// Import CSS Files
import '../style/desktop.css'
import '../style/tablet.css'
import '../style/mobile.css'

// Import Libs
import ReactModal from 'react-modal'

class Modal extends Component {

    constructor() {
        super()
        this.state = {
            showModal: true,
            operator: '',
            password: '',
            loadModal: false
        }
    }

    handleCloseModal = async (event) => {
        event.preventDefault()
        if (this.state.operator.length > 0 && this.state.password.length > 0) {
            this.setState({ loadModal: true })
            const authService = new LeadService()
            const res = await authService.signIn(this.state.operator, this.state.password)

            if (res && res.message) {
                const loggedService = new LeadService()
                const response = await loggedService.logged(null, null, null, {}, null, res.data.message)

                if (response && response.data && response.data.id) {
                    response.data.campaigns.map((item, i) => {
                        if (item.id === 28) {
                            localStorage.operatorName = response.data.name
                            localStorage.operatorId = response.data.id
                            toast.success("Boas vendas!!! Login realizado com sucesso.")
                            this.setState({ showModal: this.props.showModal, operator: '', password: '' })
                            this.closeModal()
                        }
                        return localStorage
                    })
                }
                if (!localStorage.operatorName && !localStorage.operatorId) {
                    this.setState({ loadModal: false })
                    toast.error("Atenção! Você digitou dados incorretos ou não está cadastrado nessa campanha (entre em contato com o seu supervisor).")
                }
            }
            else {
                this.setState({ loadModal: false })
                toast.error("Algo de errado aconteceu! Verifique os dados digitados e tente novamente.")
            }
        }
        else {
            this.setState({ loadModal: false })
            localStorage.operatorName = ''
            localStorage.operatorId = ''
            toast.error("Por favor, informe o seu login e sua senha.")
        }
    }

    closeModal() {
        this.props.closeModal(!this.state.showModal)
        this.setState({
            showModal: !this.state.showModal,
            loadModal: false
        })
    }

    render() {
        return (
            <div>
                <ReactModal
                    isOpen={this.props.showModal}
                    ariaHideApp={false}>
                    <form onSubmit={this.handleCloseModal}>
                        <div className="form-group">
                            <div className="text-center modal-title">
                                Informe o seu login e e sua senha
                        </div>
                            <div className="mt-2">
                                <input id="login" value={this.state.operator} onChange={(e) => this.setState({ operator: e.target.value.toString() })} className="form-control" type="number" placeholder="Login">
                                </input>
                            </div>
                            <div className="mt-3">
                                <input id="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} className="form-control" type="password" placeholder="Senha">
                                </input>
                            </div>
                            <div>
                                <button id="btnLogin" className={this.state.loadModal ? "button-modal disabled" : "button-modal"} type="submit" disabled={this.state.loadModal}>
                                    {
                                        this.state.loadModal ? 'Aguarde...' : 'Entrar'
                                    }
                                    {
                                        this.state.loadModal ?
                                            <div className="spinner-border modal text-danger" role="status"></div> : null
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                </ReactModal>
            </div>
        )
    }
}
export default Modal