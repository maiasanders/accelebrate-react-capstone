import axios from "axios";
import { Order } from "./types";
import { ItemDto } from "../components/CreditCardForm/CreditCardForm";

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getMenuItems = () => {
    return api.get('/api/menuitems')
}

export const getAllOrders = () => {
    return api.get(`/api/orders`)
}

export const getOrderById = (id: number) => {
    return api.get(`/api/orders/${id}`)
}

export const getOrderItems = (orderId: number) => {
    return api.get(`/api/items/order/${orderId}`)
}

export const createOrder = (order: Partial<Order>) => {
    return api.post(`/api/orders`, order)
}

export const addItemsToOrder = (orderId: number, items: ItemDto[]) => {
    return api.post(`/api/items/order/${orderId}`, items)
}
