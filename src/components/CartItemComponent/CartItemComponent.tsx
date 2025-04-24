import { useContext } from "react";
import { formatUsd } from "../../utils/formatters";
import { CartItem } from "../../utils/types";
import CartDispatchContext from "../../context/CartDispatchContext";

const CartItemComponent = ({ item }: { item: CartItem }) => {

    const dispatch = useContext(CartDispatchContext)

    return (<tr>
        <td>{item.name}</td>
        <td>{item.notes || ''}</td>
        <td>{item.price}</td>
        <td><input
            type="number" value={item.quantity}
            onChange={(e) => {
                if (dispatch) dispatch({ type: "update", item: { ...item, quantity: parseInt(e.currentTarget.value) } })
            }}
        /></td>
        <td><button type="button" onClick={() => dispatch && dispatch({ type: "remove", itemid: item.itemid })}>X</button>
        </td>
    </tr>)

    return (<li>
        <h3>{item.name}</h3>
        <p>{item.notes}</p>
        <h4>{formatUsd(item.price)}</h4>
        <input
            type="number" value={item.quantity}
            onChange={(e) => {
                if (dispatch) dispatch({ type: "update", item: { ...item, quantity: parseInt(e.currentTarget.value) } })
            }}
        />
        <button type="button" onClick={() => dispatch && dispatch({ type: "remove", itemid: item.itemid })}>X</button>
    </li>)
}

export default CartItemComponent
