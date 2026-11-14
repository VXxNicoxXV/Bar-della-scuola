import { menu } from "../data/menu"
import type { OrderItem } from "../types"

export function getTotal(order: OrderItem[]): number {
    const total = order.reduce((sum, item) => {
        const product = menu.find(p => p.id === item.productId)
        return sum + (product ? product.price * item.quantity : 0)
    }, 0)
    return Math.round(total * 100) / 100
}