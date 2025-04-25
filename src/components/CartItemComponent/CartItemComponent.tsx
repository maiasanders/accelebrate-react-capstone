import { useContext } from "react";
import { CartItem } from "../../utils/types";
import CartDispatchContext from "../../context/CartDispatchContext";
import styles from './CartItemComponent.module.css'

const CartItemComponent = ({ item }: { item: CartItem }) => {

    const dispatch = useContext(CartDispatchContext)

    return (<tr className={styles.cartItemComp}>
        <td>{item.name}</td>
        <td>{item.notes || ''}</td>
        <td>{item.price}</td>
        <td><input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) => {
                if (dispatch) dispatch({ type: "update", item: { ...item, quantity: parseInt(e.currentTarget.value) } })
            }}
        /></td>
        <td><button type="button" onClick={() => dispatch && dispatch({ type: "remove", itemid: item.itemid })}>X</button>
        </td>
    </tr>)
}

export default CartItemComponent
