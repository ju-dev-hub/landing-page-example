import React, { Component } from 'react'

// Import Services
import LeadService from '../../redux/lead_service'

// Import Components
import Footer from '../../components/footer'
import Copyright from '../../components/copyright'
import WhatsappChat from '../../components/whatsapp'

// Import Libs
import TagManager from 'react-gtm-module'

// Import CSS Files
import '../../style/desktop.css'
import '../../style/tablet.css'
import '../../style/mobile.css'

// Import Images
import mapfreLogo from '../../img/mapfre_logo.png'
import successIcon from '../../img/icon_success.svg'

class Success extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paymentType: null,
            id: this.props.match.params.id,
            routerPayment: `/checkout/payment/7/${this.props.match.params.id}`
        }
    }

    UNSAFE_componentWillMount() {
        TagManager.initialize({ gtmId: 'GTM-TK67XL3' })

        this.getLead()
        const s = document.createElement('script')
        s.innerHTML = "!function(f,b,e,v,n,t,s){if (f.fbq) return; n = f.fbq = function () {n.callMethod ?n.callMethod.apply(n, arguments) : n.queue.push(arguments)};if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';n.queue = []; t = b.createElement(e); t.async = !0;t.src = v; s = b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t, s)} (window, document, 'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '615025402282092');fbq('track', 'PageView');"
    }

    getLead = async () => {
        try {
            const getId = this.state.id
            const leadService = new LeadService()
            const res = await leadService.findLead(getId)
            if (res && res.data && res.data.email) {
                this.setState({
                    leadInfo: res.data,
                    email: res.data.email,
                    paymentType: res.data.payment && res.data.payment.paymentType ? res.data.payment.paymentType : null
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="row justify-content-center d-flex align-items-center" >
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-8 col-10 text-center success-box">
                    <div className="order-title">Parabéns!</div>
                    <div className="order-text">Seu pedido foi realizado com sucesso.</div>
                    <div className="text-center">
                        <img className="img-success" src={successIcon} alt="Pedido realizado" />
                    </div>
                    <div className="order-wait">Aguarde a confirmação de pagamento.</div>
                    <div className="order-email">Você receberá por email o seu comprovante e contrato do seguro residencial.</div>
                    {
                        this.state.paymentType === 'debit' ? <div className="debit-alert">Fique atento! Lembre-se de entrar em contato com seu banco para autorizar o débito automático desta compra.</div> : null
                    }
                    <div className="order-0800">Dúvidas ligue para:<br /> 0800-224020</div>
                    <div className="col mt-3 order-0800">
                        <a href="/" >
                            Voltar ao início
                        </a>
                    </div>
                    <div className="success-row"></div>
                    <div className="mt-5 text-center">
                        <img className="img-success" src={mapfreLogo} alt="Logo da Batata" />
                    </div>
                </div>
                <div className="col-12 footer-success" id="background-footer">
                    <Footer></Footer>
                </div>
                <div className="col-12" id="background-copyright">
                    <Copyright></Copyright>
                </div>
                <WhatsappChat />
            </div>
        )
    }
}

export default Success
