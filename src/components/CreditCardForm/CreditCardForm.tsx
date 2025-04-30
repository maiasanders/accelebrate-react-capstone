import styles from './CreditCardForm.module.css'
import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import { addItemsToOrder, createOrder } from "../../utils/apiUtils";
import { useNavigate } from "react-router";
import { Action } from "../../reducers/checkouReducer";
import { isNum, validateCheckoutForm, validateCvv, validateExpiryMonth, validateExpiryYear, validatePan } from './validation';
import CartDispatchContext from '../../context/CartDispatchContext';

export interface ItemDto {
    itemid: number;
    price: number;
    notes: string;
    firstName: string;
}


const CreditCardForm = ({ fields, dispatch }: {
    fields: CheckoutFields,
    dispatch: React.ActionDispatch<[action: Action]>
}) => {

    const cartItems = useContext(CartContext)

    const navigate = useNavigate()
    const [cvv, setCvv] = useState('')
    const [checkoutErrors, setCheckoutErrors] = useState({
        pan: '',
        expiryMonth: '',
        expiryYear: '',
        area: '',
        location: '',
        tip: '',
        cvv: ''
    })

    const dispatchCart = useContext(CartDispatchContext)

    const submitData = (e: React.FormEvent) => {
        e.preventDefault()

        let orderId = 0
        const order = {
            ...fields,
            ordertime: null,
            pickuptime: null,
            tax: 5,
            status: "new"
        }

        const itemsReq: ItemDto[] = [];
        for (const item of cartItems) {
            for (let i = 0; i < item.quantity; i++) {
                itemsReq.push({
                    itemid: item.itemid,
                    price: item.price,
                    notes: item.notes,
                    firstName: ''
                })
            }
        }

        createOrder(order)
            .then(r => {
                if (r.status === 201) orderId = r.data.id
                addItemsToOrder(orderId, itemsReq)
                    .then(r => {
                        if (dispatchCart) dispatchCart({ type: 'clear' })
                        return r.status === 201 ? navigate('/') : null
                    })
            })
    }

    return (<form id={styles.checkoutForm} onSubmit={e => submitData(e)}>
        <fieldset>
            <legend>Add Payment Info</legend>
            <div className="input-group">
                <label htmlFor="pan">Card Number</label>
                <label
                    htmlFor='pan'
                    className={`form-warn`}
                >{checkoutErrors.pan}</label>
                <input
                    name="pan"
                    type="text"
                    value={fields.pan}
                    maxLength={16}
                    onChange={(e) => isNum(e.target.value) && dispatch({ type: 'pan', pan: e.target.value })}
                    onBlur={() => setCheckoutErrors({ ...checkoutErrors, pan: validatePan(fields.pan) })}
                />
            </div>
            <div className="input-group">
                <label>Expiration</label>
                <label
                    htmlFor='expiryMonth'
                    className={`form-warn`}
                >{checkoutErrors.expiryMonth || checkoutErrors.expiryYear}</label>
                <input
                    name="expiryMonth"
                    id={styles.expiryMonth}
                    type="text"
                    value={fields.expiryMonth}
                    maxLength={2}
                    className={checkoutErrors.expiryMonth.length > 0 ? 'inputErr' : ''}
                    onChange={e => isNum(e.target.value) && dispatch({ type: 'expiryMonth', month: parseInt(e.target.value) })}
                    onBlur={(e) => setCheckoutErrors({ ...checkoutErrors, expiryMonth: validateExpiryMonth(e.target.value) })}
                />/
                <input
                    name="expiryYear"
                    value={fields.expiryYear}
                    id={styles.expiryYear}
                    type="text"
                    maxLength={2}
                    className={checkoutErrors.expiryMonth.length > 0 ? 'inputErr' : ''}
                    onChange={e => isNum(e.target.value) && dispatch({ type: 'expiryYear', year: parseInt(e.target.value) })}
                    onBlur={(e) => setCheckoutErrors({ ...checkoutErrors, expiryYear: validateExpiryYear(e.target.value) })}
                />
            </div>
            <div className="input-group">
                <label htmlFor="cvv">CVV</label>
                <label
                    htmlFor='cvv'
                    className={`form-warn`}
                >{checkoutErrors.cvv}</label>
                <input
                    value={cvv}
                    placeholder="CVV"
                    id={styles.cvv}
                    type="text"
                    name="cvv"
                    maxLength={3}
                    minLength={3}
                    onChange={e => (isNum(e.target.value)) && setCvv(e.target.value)}
                    onBlur={e => setCheckoutErrors({ ...checkoutErrors, cvv: validateCvv(e.target.value) })}
                />
            </div>
        </fieldset>
        <div className="input-group">
            <label>Area</label>
            <label
                htmlFor='area'
                className={`form-warn`}
            >{checkoutErrors.area}</label>
            <input
                value={fields.area}
                type="text"
                name="area"
                onChange={e => dispatch({ type: 'area', area: e.target.value })}
                onBlur={() => setCheckoutErrors({ ...checkoutErrors, area: fields.area.length > 0 ? '' : 'Area is required' })}
            />
        </div>
        <div className="input-group">
            <label>Location</label>
            <label
                htmlFor='location'
                className={`form-warn`}
            >{checkoutErrors.location}</label>
            <input
                value={fields.location}
                name="location"
                onChange={e => dispatch({ type: 'location', location: e.target.value })}
                onBlur={() => setCheckoutErrors({ ...checkoutErrors, location: fields.location.length > 0 ? '' : 'Location is required' })}
            />
        </div>
        <div className="input-group">
            <label>Tip</label>
            <label
                htmlFor='tip'
                className={`form-warn`}
            >{checkoutErrors.tip}</label>
            <input
                value={fields.tip}
                type="number"
                name="tip"
                onChange={e => isNum(e.target.value) && dispatch({ type: 'tip', tip: parseInt(e.currentTarget.value) })}
                onBlur={e => setCheckoutErrors({ ...checkoutErrors, cvv: isNum(e.target.value) ? '' : 'Invalid tip' })}
            />
        </div>
        <button
            type="submit"
            disabled={!validateCheckoutForm(fields, cvv)}
        >Submit Payment Info</button>
    </form>)
}

export default CreditCardForm

export interface CheckoutFields {
    pan: string;
    expiryMonth: number;
    expiryYear: number;
    area: string;
    location: string;
    tip: number;
}
