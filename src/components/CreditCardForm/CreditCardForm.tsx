import styles from './CreditCardForm.module.css'
import React, { useContext, useReducer, useState } from "react";
import CartContext from "../../context/CartContext";
import { Order } from "../../utils/types";
import { addItemsToOrder, createOrder } from "../../utils/apiUtils";
import { useNavigate } from "react-router";
import checkoutReducer from "../../reducers/checkouReducer";

/**
 * Unable to get submit to work, I tried transforming the data,
 * but I am still  getting a 500 response error.
 * Springboot error message is "Row was updated or deleted by another transaction (or unsaved-value mapping was incorrect)"
*/

export interface ItemDto {
    itemid: number;
    price: number;
    notes: string;
    firstName: string;
}

const CreditCardForm = () => {

    const cartItems = useContext(CartContext)
    const navigate = useNavigate()
    const [fields, dispatch] = useReducer(checkoutReducer, blankFields)
    const [cvv, setCvv] = useState('')

    const submitData = (e: React.FormEvent) => {
        e.preventDefault()



        let orderId = 0
        const order: Order = {
            ...fields,
            id: 0,
            ordertime: null,
            pickuptime: null,
            tax: 5,
            status: "new"
        }
        createOrder(order)
            .then(r => {
                if (r.status === 201) orderId = r.data.id
            })
        if (orderId > 0) {
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
            addItemsToOrder(orderId, itemsReq)
                .then(r => r.status === 201 ? navigate('/') : null)
        }
    }

    return (<form onSubmit={e => submitData(e)}>
        <fieldset>
            <legend>Add Payment Info</legend>
            <div className="input-group">
                <label htmlFor="pan">Card Number</label>
                <input type="text" name="pan" value={fields.pan} onChange={(e) => dispatch({ type: 'pan', pan: e.target.value })} />
            </div>
            <div className="input-group">
                <label>Expiration</label>
                <input
                    value={fields.expiryMonth}
                    onChange={e => dispatch({ type: 'expiryMonth', month: parseInt(e.target.value) })}
                    id={styles.expiryMonth}
                    type="text"
                    name="expiryMonth"
                />/
                <input
                    value={fields.expiryYear}
                    id={styles.expiryYear}
                    type="text"
                    name="expiryYear"
                    onChange={e => dispatch({ type: 'expiryYear', year: parseInt(e.target.value) })}
                />
            </div>
            <div className="input-group">
                <label htmlFor="cvv">CVV</label>
                <input
                    value={cvv}
                    placeholder="CVV"
                    id={styles.cvv}
                    type="text"
                    name="cvv"
                    onChange={e => setCvv(e.target.value)}
                />
            </div>
        </fieldset>
        <div className="input-group">
            <label>Area</label>
            <input
                value={fields.area}
                type="text"
                name="area"
                onChange={e => dispatch({ type: 'area', area: e.target.value })}
            />
        </div>
        <div className="input-group">
            <label>Location</label>
            <input
                value={fields.location}
                name="location"
                onChange={e => dispatch({ type: 'location', location: e.target.value })}
            />
        </div>
        <div className="input-group">
            <label>Tip</label>
            <input
                value={fields.tip}
                type="number"
                name="tip"
                onChange={e => dispatch({ type: 'tip', tip: parseInt(e.currentTarget.value) })}
            />
        </div>
        <button type="submit">Submit Payment Info</button>
    </form>)
}

export default CreditCardForm

const blankFields: CheckoutFields = {
    pan: '',
    expiryMonth: 0,
    expiryYear: 0,
    area: '',
    location: '',
    tip: 0,
}

export interface CheckoutFields {
    pan: string;
    expiryMonth: number;
    expiryYear: number;
    area: string;
    location: string;
    tip: number;
}
