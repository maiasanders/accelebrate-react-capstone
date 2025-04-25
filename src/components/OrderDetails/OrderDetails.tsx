import { useNavigate, useParams } from "react-router"

import { formatDate, formatTime, formatUsd } from "../../utils/formatters"
import styles from './OrderDetails.module.css'
import orders from '../../../orders.json'
import items from '../../../items.json'
import { useContext, useEffect, useState } from "react"
import { Item, Order } from "../../utils/types"
import { getOrderById, getOrderItems } from "../../utils/apiUtils"
import MenuItemContext from "../../context/MenuItemContext"
// TODO change to API

// let order: Order;

const OrderDetails = () => {

    const navigate = useNavigate()
    const menuItems = useContext(MenuItemContext)

    const { id } = useParams()
    if (typeof id === 'undefined') throw navigate('/')

    // const [order, setOrder] = useState<Order>()
    const [orderItems, setOrderItems] = useState<Item[]>([])
    const order = orders.filter(o => o.id === parseInt(id))[0]

    useEffect(() => {
        getOrderItems(parseInt(id)).then(r => setOrderItems(r.data))
        // getOrderById(parseInt(id)).then(r => setOrder(r.data))
    }, [id])

    // const orderItems = items.filter(i => i.orderid === parseInt(id))
    const getItemName = (itemid: number) => {
        for (const menuItem of menuItems) {
            if (menuItem.id === itemid) return menuItem.name
        }
        return 'n/a'
    }
    const subtotal = items.map(i => i.price).reduce((a, c) => a + c, 0)

    return (<main id={styles.orderDetails}>
        <h4 id={styles.orderNum}>Order {order.id}</h4>
        <h5 id={styles.date}>Order Date: {order.ordertime ? formatDate(order.ordertime) : 'n/a'}</h5>
        <h6 id={styles.orderTime}>Order Time: {order.ordertime ? formatTime(order.ordertime) : "n/a"}</h6>
        <h6 id={styles.pickup} >Pick Up Time: {order.pickuptime ? formatTime(order.pickuptime) : 'n/a'}</h6>
        <table>
            <tbody>
                {orderItems.map(i => (<tr key={i.id}>
                    <td>{getItemName(i.itemid)}</td>
                    <td>{formatUsd(i.price)}</td>
                </tr>))}
            </tbody>
            <tfoot >
                <tr className={styles.receiptTotals}>
                    <th>Subtotal</th>
                    <td>{formatUsd(subtotal)}</td>
                </tr>
                <tr className={styles.receiptTotals}>
                    <th>Tax</th>
                    <td>{formatUsd(order.tax)}</td>
                </tr>
                <tr className={styles.receiptTotals}>
                    <th>Tip</th>
                    <td>{formatUsd(order.tip)}</td>
                </tr>
                <tr className={styles.receiptTotals}>
                    <th>Total</th>
                    <td>{formatUsd(subtotal + order.tax + order.tip)}</td>
                </tr>
            </tfoot>
        </table>
    </main>)
}

export default OrderDetails
