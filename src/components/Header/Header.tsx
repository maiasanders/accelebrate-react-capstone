import { NavLink } from "react-router"

// TODO styling
const Header = () => {
    return (<header>
        <h1>Maia's International Cafe</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/checkout">Checkout</NavLink> {/* TODO add route */}
            <NavLink to="/orders">Order History</NavLink> {/* TODO add route */}
            <NavLink to="/login">Log In</NavLink> {/* TODO add route */}
        </nav>
    </header>)
}

export default Header
