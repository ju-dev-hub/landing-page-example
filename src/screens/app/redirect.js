import React, { Component } from 'react'
import NavbarForm from '../../components/navbar-form'
import LeadService from '../../redux/lead_service'
import queryString from 'query-string'

// Import CSS Files
import '../../style/desktop.css'
import '../../style/tablet.css'
import '../../style/mobile.css'

class Redirect extends Component {

    componentDidMount() {
        this.getLead()
    }

    getLead = async () => {
        try {
            let queryParameters = queryString.parse(this.props.location.search)

            let remarketing = {
                'url': 'https://segure.ai' + this.props.location.pathname + this.props.location.search,
                'total': null,
                'utmSource': (queryParameters.utm_source !== 'undefined') ? queryParameters.utm_source : null,
                'utmMedium': (queryParameters.utm_medium !== 'undefined') ? queryParameters.utm_medium : null,
                'utmCampaign': (queryParameters.utm_campaign !== 'undefined') ? queryParameters.utm_campaign : null
            }

            const getId = this.props.match.params.id

            const leadService = new LeadService()
            const res = await leadService.findLead(getId)

            if (res && res.data && res.data._id && res.data.step) {
                remarketing.total = (res.data.remarketing && res.data.remarketing.total) ? res.data.remarketing.total + 1 : 1

                leadService.update(getId, {
                    'remarketing': remarketing
                })

                switch (res.data.step) {
                    case 2: this.props.history.push(encodeURI(`/contract/coverage/2/${res.data._id}`))
                        break
                    case 3: this.props.history.push(encodeURI(`/form/details/3/${res.data._id}`))
                        break
                    case 4: this.props.history.push(encodeURI(`/form/address/4/${res.data._id}`))
                        break
                    case 5: this.props.history.push(encodeURI(`/checkout/payment/5/${res.data._id}`))
                        break
                    case 6: this.props.history.push(encodeURI(`/checkout/success/6/${res.data._id}`))
                        break
                    default:
                        break
                }

                window.localStorage.clear(getId)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                <NavbarForm></NavbarForm>
                <div className="spinner-border init text-danger" role="status"></div>
            </div>
        );
    }
}

export default Redirect