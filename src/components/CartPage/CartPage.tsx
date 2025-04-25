import { useContext, useState } from "react"
import CartContext from "../../context/CartContext"
import CartItemComponent from "../CartItemComponent/CartItemComponent"
import { formatUsd } from "../../utils/formatters"
import CreditCardForm from "../CreditCardForm/CreditCardForm"
import styles from './CartPage.module.css'

const CartPage = () => {
    const cartItems = useContext(CartContext)
    const cartTotal = cartItems.map(i => i.quantity * i.price || 0).reduce((a, c) => a + c, 0)
    const [showCreditForm, setShowCreditForm] = useState(false)

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
                    <th scope="row" rowSpan={3}>Total</th>
                    <th></th>
                    <td rowSpan={1}>{formatUsd(cartTotal)}</td>
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
        {showCreditForm && <CreditCardForm />}
    </main>)
}

export default CartPage
