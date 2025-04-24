import { createContext } from "react"
import { CartItem } from "../utils/types"

const CartContext = createContext<CartItem[]>([])

export default CartContext
