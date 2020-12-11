import React, { Component } from 'react'
import LeadService from '../../redux/lead_service'

// Import CSS Files
import '../../style/desktop.css'
import '../../style/tablet.css'
import '../../style/mobile.css'

//Import Components
import Navbar from '../../components/navbar'
import Cotation from '../../components/cotation'
import OperatorCotation from '../../components/operator-cotation'
import Coast from '../../components/coast'
import Assistance from '../../components/assistance'
import Reward from '../../components/reward'
import Help from '../../components/help'
import About from '../../components/about'
import Footer from '../../components/footer'
import Copyright from '../../components/copyright'
import ChatImages from '../../components/chat'
import WhatsappChat from '../../components/whatsapp'

class App extends Component {

    UNSAFE_componentWillMount() {
        var idLead = localStorage.segureAiId
        if (idLead) {
            this.redirectLead(idLead)
        }
        else {
            return
        }
    }

    redirectLead = async (idLead) => {
        try {
            const leadService = new LeadService()
            const res = await leadService.findLead(idLead)

            if (res && res.data) {
                this.setState({
                    leadInfo: res.data,
                    leadId: res.data._id,
                    leadStep: res.data.step
                })

                // switch (res.data.step) {                    
                //     case 2: this.props.history.push(encodeURI(`/contract/coverage/2/${res.data._id}`))
                //         break                   
                //     case 3: this.props.history.push(encodeURI(`/form/details/3/${res.data._id}`))
                //         break
                //     case 4: this.props.history.push(encodeURI(`/form/address/4/${res.data._id}`))
                //         break
                //     case 5: this.props.history.push(encodeURI(`/checkout/payment/5/${res.data._id}`))
                //         break
                //     case 6: this.props.history.push(encodeURI(`/checkout/success/6/${res.data._id}`))
                //         break
                //     default:
                //         break
                // }

                window.localStorage.clear(idLead)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <ChatImages />
                <Navbar />
                <div id={this.props.location.pathname === "/" ? "background-woman" : "background-woman-operator"}>
                    <div className="container">
                        <div className="box">
                            <div className="white-box">
                                <div className="red-box">
                                    {
                                        this.props.location.pathname === "/" ? <Cotation id="cotation" /> : <OperatorCotation id="cotation" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Coast />
                <div id="background-assistance">
                    <Assistance />
                </div>
                <Reward />
                <Help />
                <div id="background-about">
                    <div className="container">
                        {/* <div className="col-12 white-box-people">
                            <People></People>
                        </div> */}
                        <div className="row justify-content-center d-flex align-items-center">
                            <div className="col-lg-10 col-md-12 about-white-box">
                                <About></About>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12" id="background-footer">
                    <Footer />
                </div>
                <div className="col-12" id="background-copyright">
                    <Copyright />
                </div>
                <WhatsappChat />
            </div>
        )
    }
}

export default App
