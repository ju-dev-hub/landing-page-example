import React, { Component } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import App from './app/App'
import ContractIndex from './contract'
import Coverage from './contract/coverage'
import FormIndex from './form'
import FormAddress from './form/address'
import FormDetails from './form/details'
import Checkout from './checkout/index'
import Payment from './checkout/payment'
import Success from './checkout/success'
import Redirect from './app/redirect'

class Routes extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route path="/" exact={true} component={App} />
                    <Route path="/operador" exact={true} component={App} />
                    <Route path="/contract" component={ContractIndex} />
                    <Route path="/contract/coverage/2/:id" component={Coverage} />
                    <Route path="/form" component={FormIndex} />
                    <Route path="/form/details/3/:id" component={FormDetails} />
                    <Route path="/form/address/4/:id" component={FormAddress} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/checkout/payment/5/:id" component={Payment} />
                    <Route path="/checkout/success/6/:id" component={Success} />
                    <Route path="/redirect/:id" component={Redirect} />
                </div>
            </Router>
        )
    }
}

export default Routes