import { CartItem } from "../utils/types";

export type Action =
    | { type: 'add', item: CartItem }
    | { type: 'remove', itemid: number }
    | { type: 'update', item: CartItem }
    | { type: 'clear' }

export default function cartReducer(cart: CartItem[], action: Action) {
    switch (action.type) {
        case 'add': {
            return [...cart, {
                itemid: action.item.itemid,
                name: action.item.name,
                price: action.item.price,
                notes: action.item.notes,
                quantity: action.item.quantity
            }]
        }
        case 'remove': {
            return [...cart.filter(i => i.itemid !== action.itemid)]
        }
        case 'update': {
            return [...cart.map(i => i.itemid === action.item.itemid ? action.item : i)]
        }
        case 'clear': {
            return []
        }
    }
}
