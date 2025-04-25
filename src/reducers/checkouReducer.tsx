import { CheckoutFields } from "../components/CreditCardForm/CreditCardForm"


export type Action =
    | { type: 'pan', pan: string }
    | { type: 'expiryMonth', month: number }
    | { type: 'expiryYear', year: number }
    | { type: "location", location: string }
    | { type: 'area', area: string }
    | { type: 'tip', tip: number }
const checkoutReducer = (state: CheckoutFields, action: Action) => {
    switch (action.type) {
        case 'pan': {
            return { ...state, pan: action.pan }
        }
        case 'expiryMonth': {
            return { ...state, expiryMonth: action.month }
        }
        case 'expiryYear': {
            return { ...state, expiryYear: action.year }
        }
        case 'location': {
            return { ...state, location: action.location }
        }
        case 'area': {
            return { ...state, area: action.area }
        }
        case 'tip': {
            return { ...state, tip: action.tip }
        }
    }
}

export default checkoutReducer
