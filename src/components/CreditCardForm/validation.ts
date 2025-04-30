import { CheckoutFields } from "./CreditCardForm"

export const isNum = (str: string) => (/^\d+$/).test(str)

export const validatePan = (pan: string) => {
    return (/^\d{14,16}$/).test(pan) ? '' : 'Invalid card number'
}
export const validateExpiryMonth = (expiryMonth: string) => {
    return parseInt(expiryMonth) > 0 && parseInt(expiryMonth) <= 12 ?
        '' : 'Invalid expiration date'
}

export const validateExpiryYear = (year: string) => {
    return year.length === 2 && parseInt(year) + 2000 >= new Date(Date.now()).getFullYear() ?
        '' : 'Invalid Expiration date'
}

export const validateCvv = (cvv: string) => {
    return (/^\d{3}$/).test(cvv) ? '' : 'Invalid CVV'
}

export const validateCheckoutForm = (fields: CheckoutFields, cvv: string) => {
    if (validatePan(fields.pan).length > 0) return false;
    if (validateExpiryMonth(fields.expiryMonth.toString())) return false;
    if (validateExpiryYear(fields.expiryYear.toString())) return false;
    if (fields.area.length === 0) return false
    if (fields.location.length === 0) return false
    if (validateCvv(cvv)) return false
    return (isNum(cvv) && cvv.length === 3)
}
