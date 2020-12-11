import Service from './service';

export default class LeadService {

    constructor() {
        this.service = new Service()
    }

    create = async (name = null, email = null, phone = null, step = null, stepName = null, quote = null, media = null, url = null, operator = null) => {
        this.service = new Service()
        if (operator) {
            let operatorRequest = {
                name: name,
                email: email,
                phone: phone,
                step: step,
                stepName: stepName,
                quote: quote,
                operator: operator,
                media: media,
                urlOrigin: url
            }
            return await this.service.post(operatorRequest, `${process.env.REACT_APP_API_BATATA}/lead/create`)
        }
        else {
            let request = {
                name: name,
                email: email,
                phone: phone,
                step: step,
                stepName: stepName,
                quote: quote
            }
            return await this.service.post(request, `${process.env.REACT_APP_API_BATATA}/lead/create`)
        }
    }

    update = async (id = null, userInfo = null) => {
        this.service = new Service()
        const request = userInfo
        return await this.service.post(request, `${process.env.REACT_APP_API_BATATA}/lead/update/${id}`)
    }

    findLead = async (id) => {
        this.service = new Service()
        const request = {
            id: id
        }
        return await this.service.post(request, `${process.env.REACT_APP_API_BATATA}/lead/find/${id}`)
    }

    getAddress = async (zipcode = null, idUser = null) => {
        const request = {
            zipcode: zipcode,
            idUser: idUser
        }
        return await this.service.post(request, `${process.env.REACT_APP_API_BATATA}/address/get`)
    }

    signIn = async (login = null, password = null) => {
        const request = {
            login: login,
            password: password,
        }
        return await this.service.post(request, `${process.env.REACT_APP_API_BATATA}/sign-in`)
    }

    logged = async (hostname = null, username = null, freeMemory = null, cpus = {}, ip = null, key = null) => {
        const request = {
            hostname: hostname,
            username: username,
            freeMemory: freeMemory,
            cpus: cpus,
            ip: ip,
            key: key
        }
        return await this.service.post(request, `${process.env.REACT_APP_API_BATATA}/user/logged`)
    }

    sendEmail = async (email = null, name = null, id = null) => {
        const request = {
            email: email,
            name: name,
            id: id
        }
        return await this.service.get(request, `${process.env.REACT_APP_API_BATATA}/lead/email`)
    }

    getClientId = async (id = null, operator = null, media = null) => {
        const request = {
            operator: operator,
            media: {
                key: media.toLowerCase()
            }
        }
        return await this.service.post(request, `${process.env.REACT_APP_API_BATATA}/lead/update-operator/${id}`)
    }

}

