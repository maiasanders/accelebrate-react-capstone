import { NavLink } from "react-router"

import styles from './Header.module.css'

// TODO styling
const Header = () => {
    return (<header id={styles.header}>
        <h1>Maia's International Cafe</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/checkout">Checkout</NavLink> {/* TODO add route */}
            <NavLink to="/orderhistory">Order History</NavLink> {/* TODO add route */}
            <NavLink to="/login">Log In</NavLink> {/* TODO add route */}
        </nav>
    </header>)
}

export default Header
