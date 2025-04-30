import { useContext, useReducer, useState } from "react"
import CartContext from "../../context/CartContext"
import CartItemComponent from "../CartItemComponent/CartItemComponent"
import { formatUsd } from "../../utils/formatters"
import CreditCardForm, { CheckoutFields } from "../CreditCardForm/CreditCardForm"
import styles from './CartPage.module.css'
import checkoutReducer from "../../reducers/checkouReducer"

const CartPage = () => {
    const cartItems = useContext(CartContext)
    const cartTotal = cartItems.map(i => i.quantity * i.price || 0).reduce((a, c) => a + c, 0)
    const [showCreditForm, setShowCreditForm] = useState(false)
    const [fields, dispatch] = useReducer(checkoutReducer, blankFields)
    const tax = cartTotal * 0.05

    return (<main id={styles.cartPage}>
        <h2>Cart</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Notes</th>
                    <th>Price</th>
                    <th>Quanitity</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map(i => (<CartItemComponent item={i} key={i.itemid} />))}
            </tbody>
            <tfoot>
                <tr>
                    <th>Subtotal</th>
                    <th></th>
                    <td rowSpan={1}>{formatUsd(cartTotal)}</td>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th>Tax</th>
                    <th></th>
                    <td rowSpan={1}>{formatUsd(tax)}</td>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th>Tip</th>
                    <th></th>
                    <td rowSpan={1}>{formatUsd(fields.tip)}</td>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th>Total</th>
                    <th></th>
                    <td rowSpan={1}>{formatUsd(cartTotal + tax + fields.tip)}</td>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
        <button
            type="button"
            onClick={() => setShowCreditForm(true)}
            className={styles.checkout}
        >Checkout</button>
        {showCreditForm && <CreditCardForm fields={fields} dispatch={dispatch} />}
    </main>)
}

export default CartPage

const blankFields: CheckoutFields = {
    pan: '',
    expiryMonth: 0,
    expiryYear: 0,
    area: '',
    location: '',
    tip: 0,
}
