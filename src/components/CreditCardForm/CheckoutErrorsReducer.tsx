interface CheckoutErrors {
    pan: string;
    expiryMonth: string;
    expiryYear: string;
    area: string;
    location: string;
    tip: string;
}

export type ErrorAction =
    | { type: 'pan', msg: string }
    | { type: 'expiryMonth', msg: string }
    | { type: 'expiryYear', msg: string }
    | { type: "location", msg: string }
    | { type: 'area', msg: string }
    | { type: 'tip', msg: string }

const CheckoutErrorsReducer = (state: CheckoutErrors, action: ErrorAction) => {
    switch (action.type) {
        case 'pan': {
            return { ...state, pan: action.msg }
        }
        case 'expiryMonth': {
            return { ...state, expiryMonth: action.msg }
        }
        case 'expiryYear': {
            return { ...state, expiryYear: action.msg }
        }
        case 'location': {
            return { ...state, location: action.msg }
        }
        case 'area': {
            return { ...state, area: action.msg }
        }
        case 'tip': {
            return { ...state, tip: action.msg }
        }
    }
}

export default CheckoutErrorsReducer
