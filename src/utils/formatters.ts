export const formatUsd = (price: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)
}

export const formatDate = (date: Date | string) => {
    if (typeof date === 'string') date = new Date(date)
    return new Intl.DateTimeFormat("en-US").format(date)
}

export const formatTime = (date: Date | string) => {
    if (typeof date === 'string') date = new Date(date)
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" })
}

export const calculateTax = (tax: number, subtotal: number) => (tax / 100) * subtotal;
