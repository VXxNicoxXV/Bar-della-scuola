import { menu } from "../data/menu"
import type { OrderItem } from "../types"

export const MAX_QUANTITY = 5
export const MAX_RECREATION_ORDERS = 3

export const DISCOUNT_CODE = "bar10"
export const DISCOUNT_RATE = 0.1

export function getTotal(order: OrderItem[]): number {
    const total = order.reduce((sum, item) => {
        const product = menu.find(p => p.id === item.productId)
        return sum + (product ? product.price * item.quantity : 0)
    }, 0)
    return Math.round(total * 100) / 100
}

export function isDiscountValid(code: string): boolean {
    return code.trim().toLowerCase() === DISCOUNT_CODE
}

export function applyDiscount(total: number): number {
    return Math.round(total * (1 - DISCOUNT_RATE) * 100) / 100
}