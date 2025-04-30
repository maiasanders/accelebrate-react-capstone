import { createContext } from "react"
import { CartItem } from "../utils/types"

// const CartContext = createContext<{ cartItems: CartItem[], setCartItems: React.Dispatch<SetStateAction<CartItem[]>> }>
//     ({
//         cartItems: [],
//         setCartItems: () => { }
//     })
const CartContext = createContext<CartItem[]>([])

export default CartContext
