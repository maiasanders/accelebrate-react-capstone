import { NavLink } from "react-router"

import styles from './Header.module.css'

const Header = () => {
    return (<header id={styles.header}>
        <h1>Maia's International Cafe</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/checkout">Checkout</NavLink>
            <NavLink to="/orderhistory">Order History</NavLink>
            <NavLink to="/login">Log In</NavLink>
        </nav>
    </header>)
}

export default Header
