import { useContext } from "react"
import { formatUsd } from "../../utils/formatters"
import { MenuItem } from "../../utils/types"
import styles from './MenuItemCard.module.css'
import CartDispatchContext from "../../context/CartDispatchContext"

const MenuItemCard = ({ menuItem }: { menuItem: MenuItem }) => {

    const dispatch = useContext(CartDispatchContext)

    const handleClick = () => {
        if (dispatch) dispatch({
            type: 'add',
            item: {
                itemid: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                notes: '',
                quantity: 1
            }
        })
    }

    return (<div className={styles.menuItemCard}>
        <img src={menuItem.imageurl} aria-hidden />
        <h2>{menuItem.name}</h2>
        <p>{menuItem.description}</p>
        <h3>{formatUsd(menuItem.price)}</h3>
        <button type="button" onClick={handleClick}>Add to cart</button>
    </div>)
}

export default MenuItemCard
