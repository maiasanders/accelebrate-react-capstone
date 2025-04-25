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
    id: number,
    userid?: number,
    ordertime: string | null,
    pickuptime: string | null,
    area: string,
    location?: string,
    tax?: number,
    tip?: number,
    pan: string,
    expiryMonth: number,
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
