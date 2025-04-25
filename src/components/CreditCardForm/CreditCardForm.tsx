import { SubmitHandler, useForm } from "react-hook-form"
import styles from './CreditCardForm.module.css'
import { useContext, useReducer } from "react";
import CartContext from "../../context/CartContext";
import { Order } from "../../utils/types";
import { addItemsToOrder, createOrder } from "../../utils/apiUtils";
import { useNavigate } from "react-router";
import checkoutReducer from "../../reducers/checkouReducer";



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

    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFields>() // TODO remove if get working without
    const submitData = (data: CheckoutFields) => {
        // e.preventDefault()
        console.log(data)
        let orderId = 0
        const order: Order = {
            ...fields,
            id: 0,
            ordertime: Date.now().toString(),
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

    // TODO add form validation

    return (<form onSubmit={handleSubmit(submitData)}>
        <fieldset>
            <legend>Add Payment Info</legend>
            <div className="input-group">
                <label htmlFor="pan">Card Number</label>
                <input type="text" {...register("pan", { required: true, maxLength: 16, minLength: 14, })} name="pan" value={fields.pan} onChange={(e) => dispatch({ type: 'pan', pan: e.target.value })} />
            </div>
            <div className="input-group">
                <label>Expiration</label>
                <input {...register("expiryMonth")} id={styles.expiryMonth} type="text" name="expiryMonth" />/
                <input
                    {...register("expiryYear")}
                    id={styles.expiryYear}
                    type="text"
                    name="expiryYear"
                />
            </div>
            <div className="input-group">
                <label htmlFor="cvv">CVV</label>
                <input {...register("cvv")} placeholder="CVV" id={styles.cvv} type="text" name="cvv" />
            </div>
        </fieldset>
        <div className="input-group">
            <label>Area</label>
            <input {...register("area")} type="text" name="area" />
        </div>
        <div className="input-group">
            <label>Location</label>
            <input {...register("location")} name="location" />
        </div>
        <div className="input-group">
            <label>Tip</label>
            <input {...register("tip")} type="number" name="tip" />
        </div>
        <button type="submit">Submit Payment Info</button>
    </form>)
}

export default CreditCardForm

const blankFields: CheckoutFields = {
    pan: '',
    expiryMonth: 0,
    expiryYear: 0,
    cvv: '',
    area: '',
    location: '',
    tip: 0,
}

export interface CheckoutFields {
    pan: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
    area: string;
    location: string;
    tip: number;
}
