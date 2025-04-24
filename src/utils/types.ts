export interface MenuItem {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    imageurl: string;
    available: boolean;
}

export interface Order {
    id: number;
    userId: number;
    ordertime?: Date;
    pickuptime?: Date;
    area: string;
    location: string;
    tax: number;
    tip: number;
    pan: string;
    exipryMonth: number;
    expiryYear: number;
    status: string;
}

export interface Item {
    id: number;
    orderid: number;
    itemid: number;
    price: number;
    notes: string;
    firstName: string;
}

export interface CartItem {
    itemid: number;
    name: string;
    price: number;
    notes: string;
    quantity: number;
}
