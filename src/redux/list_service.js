import Service from './service'

export default class ListService {

    constructor() {
        this.service = new Service()
    }

    getMediaList = async (idCampaign = null) => {
        const request = {
            idCampaign: idCampaign
        }
        return await this.service.post(request, `${process.env.REACT_APP_API_MAPFRE}/media/list`)
    }

    getProducts = async (idCampaigns = [], isActive = null) => {
        const request = {
            idCampaigns: idCampaigns,
            isActive: isActive
        }
        return await this.service.post(request, `${process.env.REACT_APP_API_MAPFRE}/products/get`)
    }

    viewProduct = async (idProduct = null) => {
        const request = {
            idProduct: idProduct
        }
        return await this.service.post(request, `${process.env.REACT_APP_API_MAPFRE}/product/view`)
    }

    maritalStatusList = async () => {
        return await this.service.post({}, `${process.env.REACT_APP_API_MAPFRE}/marital-status/get`)
    }

    monthlyIncomeList = async () => {
        return await this.service.post({}, `${process.env.REACT_APP_API_MAPFRE}/monthly-income/get`)
    }

    bankList = async () => {
        return await this.service.post({}, `${process.env.REACT_APP_API_MAPFRE}/bank/get`)
    }

    issuingAgencyList = async () => {
        return await this.service.post({}, `${process.env.REACT_APP_API_MAPFRE}/issuing-agency/get`)
    }

}

