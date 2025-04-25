import orders from '../../../orders.json'
import { formatDate } from '../../utils/formatters'
import { Link } from 'react-router'

import styles from './OrderHistoryPage.module.css'

const OrderHistoryPage = () => {

    return (<main id={styles.orderHistory}>
        <h2>Order History</h2>
        <ul>
            {orders.map(o =>
                <li key={o.id} className={styles.orderItem} >
                    <Link to={`/order/${o.id}/details`}>
                        <div>Order #{o.id}</div>
                        <div>{o.ordertime ? formatDate(o.ordertime) : ''}</div>
                    </Link>
                </li>)}
        </ul>
    </main>)
}

export default OrderHistoryPage
