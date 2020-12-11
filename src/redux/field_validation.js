import { toast } from "react-toastify"
import CPF from 'gerador-validador-cpf'
import moment from 'moment/moment.js'
import creditCardType from 'credit-card-type'

export default class FieldValidation {

    // DETAILS VALIDATION

    validateRG = (rg) => {
        if (rg && rg.length >= 6 && rg.length <= 15) {
            return "form-input-success"
        }
        if (rg.length > 15) {
            toast.error("Por favor, o RG deve conter no máximo 15 caracteres.")
            return "form-input-error"
        }
        if (!rg || rg.length <= 6) {
            return "form-input"
        }
    }

    validateIssuingAgency = (issuingAgency) => {
        if (!issuingAgency) {
            return 'form-select'
        }
        if (issuingAgency) {
            return 'form-input-success'
        }
    }

    validateCpf = (cpf) => {
        if (cpf.indexOf('-') === -1 && cpf.indexOf('.') === -1 && cpf.length === 11) {
            return 'form-input-success'
        }
        if (!cpf || cpf.length < 14) {
            return 'form-input'
        }
        if (cpf && cpf.length === 14) {
            let cpfValid = CPF.validate(cpf)
            if (!cpfValid) {
                toast.error("Por favor, verifique o CPF.")
                return 'form-input-error'
            }
            else {
                return 'form-input-success'
            }
        }
    }

    validateMaritalStatus = (maritalStatus) => {
        if (!maritalStatus) {
            return 'form-select'
        }
        if (maritalStatus) {
            return 'form-input-success'
        }
    }

    validateBirthday = (birth) => {
        if (!birth || birth.length < 10) {
            return 'form-input'
        }
        if (birth) {
            var birthdayFormat = null
            birthdayFormat = moment(birth, 'DD/MM/YYYY')
            var age = moment().diff(birthdayFormat, 'year')
            var re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)([1-2])([0]|[1]|[9])([0-9])([0-9])$/

            if (birthdayFormat.isValid() && age <= 105 && age >= 18 && re.test(birth)) {
                return 'form-input-success'
            }
            else {
                if (birth && birth.length === 10) {
                    toast.error("Por favor, digite uma data válida! Lembrando que você deve ter mais de 18 anos.")
                    return 'form-input-error'
                }
            }
        }
    }

    validatePhone = (phone) => {
        var getLeadPhone = phone.replace(/[^0-9]/g, '')
        var getPhone = phone.replace(/[^0-9]/g, '').charAt(2) === '9'

        if (getPhone) {
            if (phone && (phone.length === 15 || getLeadPhone.length === 11)) {
                return 'form-input-success'
            }
            else {
                return 'form-input'
            }
        }
        if (!getPhone) {
            if (phone && !getPhone && (phone.length === 14 || getLeadPhone.length === 10)) {
                return 'form-input-success'
            }
            else {
                return 'form-input'

            }
        }
    }

    validateDetailsFields(details) {
        if (details.rg.length < 6 || details.rg.length > 15) {
            toast.error("Favor digitar o RG corretamente.")
            details.loading = false
            details.btnDisabled = false
            details.classValidate.rg = 'form-input-error'
            return details

        }
        else if (details.issuingAgency === "") {
            toast.error("Por favor, informe o órgão expedidor/RG.")
            details.loading = false
            details.btnDisabled = false
            details.classValidate.issuingAgency = 'form-select-error'
            return details
        }
        else if (details.cpf === "" || details.classValidate.cpf !== 'form-input-success') {
            toast.error("Por favor, verifique o CPF.")
            details.loading = false
            details.btnDisabled = false
            details.classValidate.cpf = 'form-input-error'
            return details
        }
        else if (details.maritalStatus === "") {
            toast.error("Por favor, informe o estado civil.")
            details.loading = false
            details.btnDisabled = false
            details.classValidate.maritalStatus = 'form-select-error'
            return details
        }
        else if (details.birthday === "" || details.classValidate.birthday !== 'form-input-success') {
            toast.error("Por favor, verifique a data de nascimento.")
            details.loading = false
            details.btnDisabled = false
            details.classValidate.birthday = 'form-input-error'
            return details
        }
        else if (details.phone === "" || details.classValidate.phone !== 'form-input-success') {
            toast.error("Por favor, verifique o telefone.")
            details.loading = false
            details.btnDisabled = false
            details.classValidate.phone = 'form-input-error'
            return details
        }
        else if (details.gender === "") {
            toast.error("Por favor, verifique o sexo.")
            details.loading = false
            details.btnDisabled = false
            return details
        }
        else if (details.monthlyIncomeValue === 1) {
            toast.error("Por favor, informe a sua renda familiar.")
            details.loading = false
            details.btnDisabled = false
            return details
        }
    }

    // END DETAILS VALIDATION

    // ADDRESS VALIDATION

    validateZipcode(zipcode) {
        if (zipcode && zipcode.length === 8) {
            return 'form-input-success'
        }
        if (!zipcode) {
            return 'form-input'
        }
    }

    validateNumber(number) {
        if (!number) {
            return 'form-input'
        }
        if (number && number.length > 0) {
            return 'form-input-success'
        }
    }

    validateComplement(complement) {
        if (!complement || complement === " ") {
            return 'form-input'
        }
        if (complement && complement.length > 0) {
            return 'form-input-success'
        }
    }

    validateStreet(street) {
        if (!street || street === " ") {
            return 'form-input'
        }
        if (street && street.length > 0) {
            return 'form-input-success'
        }
    }

    validateNeighborhood(neighborhood) {
        if (!neighborhood || neighborhood === " ") {
            return 'form-input'
        }
        if (neighborhood && neighborhood.length > 0) {
            return 'form-input-success'
        }
    }

    validateAddressFields(address) {
        var zipcode = (address.zipcode) ? address.zipcode.replace(/[^0-9]+/g, '') : null
        var zipCodeValid = (zipcode && zipcode.length < 8)

        if (zipCodeValid || address.classValidate.zipcode === 'form-input' || address.classValidate.zipcode === 'form-input-error') {
            toast.error("Por favor, verifique o seu CEP.")
            address.loading = false
            address.btnDisabled = false
            address.classValidate.zipcode = 'form-input-error'
            return address

        }
        else if (!address.street || address.street === " ") {
            toast.error("Por favor, informe a rua.")
            address.loading = false
            address.btnDisabled = false
            address.classValidate.street = 'form-input-error'
            return address
        }
        else if (!address.city || address.city === " ") {
            toast.error("Por favor, informe a cidade.")
            address.loading = false
            address.btnDisabled = false
            address.classValidate.city = 'form-input-error'
            return address
        }
        else if (!address.neighborhood || address.neighborhood === " ") {
            toast.error("Por favor, informe o bairro.")
            address.loading = false
            address.btnDisabled = false
            address.classValidate.neighborhood = 'form-input-error'
            return address
        }
        else if (!address.state || address.state === " ") {
            toast.error("Por favor, informe o estado.")
            address.loading = false
            address.btnDisabled = false
            address.classValidate.state = 'form-input-error'
            return address
        }
        else if (!address.number) {
            toast.error("Por favor, informe o número.")
            address.loading = false
            address.btnDisabled = false
            address.classValidate.number = 'form-input-error'
            return address
        }
    }

    // END ADDRESS VALIDATION

    // PAYMENT VALIDATION


    validateCardNumber(card) {
        var typeCard = creditCardType(card)[0] || null
        if (!card || (card && card.length <= 19)) {
            return 'form-input'
        }
        if ((!typeCard && card.length === 19)) {
            return 'form-input-error'
        }
    }

    validateExpingDate(expiringDate) {
        if (!expiringDate || (expiringDate && expiringDate.length < 5)) {
            return 'form-input'
        }
        var validateDateCard = moment(expiringDate, 'MM/YYYY')
        var expiringDateValid = (validateDateCard >= moment() && validateDateCard < moment().add(15, 'years'))
        if (!expiringDateValid) {
            return 'form-input-error'
        }
        if (expiringDateValid && expiringDate && expiringDate.length < 8) {
            return 'form-input-success'
        }
    }

    validateCardCvc(cardCvc) {
        if (!cardCvc || (cardCvc && cardCvc.length < 3)) {
            return 'form-input'
        }
        if (cardCvc && cardCvc.length >= 3) {
            return 'form-input-success'
        }
    }

    validateName(clientName) {
        if (!clientName || clientName.indexOf(' ') === -1 || clientName.trim().split(' ').length < 2) {
            return 'form-input'
        }
        if (clientName.trim().split(' ').length >= 2) {
            return 'form-input-success'
        }
    }

    validateCardFields(cardFields) {
        if (cardFields.cardNumber.length < 19 || cardFields.classValidate.cardNumber === 'form-input-error') {
            cardFields.classValidate.cardNumber = 'form-input-error'
            return cardFields
        }
        else if (!cardFields.clientName || cardFields.clientName.trim().split(' ').length < 2) {
            cardFields.classValidate.clientName = 'form-input-error'
            toast.error("Por favor, verifique o nome do titular da conta.")
            return cardFields
        }
        else if (cardFields.expiringDate.length < 5 || cardFields.classValidate.expiringDate === 'form-input-error') {
            cardFields.classValidate.expiringDate = 'form-input-error'
            toast.error("Por favor, verifique a data de validade do cartão.")
            return cardFields
        }
        else if (cardFields.cardCvc.length < 3) {
            cardFields.classValidate.cardCvc = 'form-input-error'
            toast.error("Por favor, verifique o código CVC.")
            return cardFields
        }
        else if (cardFields.classValidate.clientCpf !== 'form-input-success') {
            toast.error("Por favor, verifique o CPF do titular da conta.")
            cardFields.classValidate.clientCpf = 'form-input-error'
            return cardFields
        }
    }

    validateBank(bank) {
        if (!bank) {
            return 'form-select'
        }
        else {
            return 'form-select-success'
        }
    }

    validateAgency(agency) {
        if (!agency || agency.length < 2) {
            return 'form-input'
        }
        else {
            return 'form-input-success'
        }
    }

    validateAccount(account) {
        if (!account || account.length < 4) {
            return 'form-input'
        }
        else {
            return 'form-input-success'
        }
    }

    validateDigit(digit) {
        if (!digit) {
            return 'form-input'
        }
        else {
            return 'form-input-success'
        }
    }

    validateDebitFields(debitFields) {
        if (debitFields.classValidate.bank !== 'form-select-success') {
            toast.error("Por favor, selecione o seu banco.")
            debitFields.classValidate.bank = 'form-select-error'
            return debitFields
        }
        else if (!debitFields.clientName || debitFields.clientName.trim().split(' ').length < 2) {
            debitFields.classValidate.clientName = 'form-input-error'
            toast.error("Por favor, verifique o nome do titular da conta.")
            return debitFields
        }
        else if (debitFields.classValidate.agency !== 'form-input-success') {
            toast.error("Por favor, verifique a sua agência.")
            debitFields.classValidate.agency = 'form-input-error'
            return debitFields
        }
        else if (debitFields.classValidate.account !== 'form-input-success') {
            toast.error("Por favor, verifique a sua conta corrente.")
            debitFields.classValidate.account = 'form-input-error'
            return debitFields
        }
        else if (debitFields.classValidate.verifyingDigit !== 'form-input-success') {
            toast.error("Por favor, informe o dígito da sua conta corrente.")
            debitFields.classValidate.verifyingDigit = 'form-input-error'
            return debitFields
        }
        else if (debitFields.classValidate.clientCpf !== 'form-input-success') {
            toast.error("Por favor, verifique o CPF do titular da conta.")
            debitFields.classValidate.clientCpf = 'form-input-error'
            return debitFields
        }
    }

    // END PAYMENT VALIDATION
}



