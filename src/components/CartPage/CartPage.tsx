import { useContext } from "react"
import CartContext from "../../context/CartContext"
import CartItemComponent from "../CartItemComponent/CartItemComponent"
import { formatUsd } from "../../utils/formatters"

const CartPage = () => {
    const cartItems = useContext(CartContext)
    const cartTotal = cartItems.map(i => i.quantity * i.price).reduce((a, c) => a + c, 0)

    return (<main>
        <h2>Cart</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Notes</th>
                    <th>Price</th>
                    <th>Quanitity</th>
                </tr>
            </thead>
            {cartItems.map(i => (<CartItemComponent item={i} key={i.itemid} />))}
            <tfoot>
                <tr>
                    <th scope="row" rowSpan={3}>Total</th>
                    <th>{formatUsd(cartTotal)}</th>
                </tr>
            </tfoot>
        </table>
        <button type="button">Checkout</button>
    </main>)
}

export default CartPage
