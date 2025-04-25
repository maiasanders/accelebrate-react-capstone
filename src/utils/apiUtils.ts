import axios from "axios";

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getMenuItems = () => {
    return api.get('/api/menuitems')
}

export const getOrderById = (id: number) => {
    return api.get(`/api/orders/${id}`)
}

export const getOrderItems = (orderId: number) => {
    return api.get(`/api/items/order/${orderId}`)
}
