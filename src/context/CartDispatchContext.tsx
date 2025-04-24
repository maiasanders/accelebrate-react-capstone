import { createContext } from "react";
import type { Action } from '../reducers/cartReducer'

const CartDispatchContext = createContext<React.ActionDispatch<[action: Action]> | null>(null)

export default CartDispatchContext
