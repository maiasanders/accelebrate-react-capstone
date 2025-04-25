import { useNavigate, useParams } from "react-router"

import { formatDate, formatTime, formatUsd } from "../../utils/formatters"
import styles from './OrderDetails.module.css'
import orders from '../../../orders.json'
import items from '../../../items.json'
// TODO change to API

const OrderDetails = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    if (typeof id === 'undefined') throw navigate('/')
    const order = orders.filter(o => o.id === parseInt(id))[0]
    const orderItems = items.filter(i => i.orderid === parseInt(id))

    const subtotal = items.map(i => i.price).reduce((a, c) => a + c, 0)

    return (<main id={styles.orderDetails}>
        <h4 id={styles.orderNum}>Order {order.id}</h4>
        <h5 id={styles.date}>Order Date: {order.ordertime ? formatDate(order.ordertime) : 'n/a'}</h5>
        <h6 id={styles.orderTime}>Order Time: {order.ordertime ? formatTime(order.ordertime) : "n/a"}</h6>
        <h6 id={styles.pickup} >Pick Up Time: {order.pickuptime ? formatTime(order.pickuptime) : 'n/a'}</h6>
        <table>
            {orderItems.map(i => (<tr>
                <td>{i.itemid}</td>
                <td>{formatUsd(i.price)}</td>
            </tr>))} {/* TODO switch to name after connecting to back end */}
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
