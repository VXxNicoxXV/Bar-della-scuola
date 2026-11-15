import { useState } from "react"
import { CheckoutForm } from "./components/CheckoutForm"
import { Menu } from "./components/Menu"
import { Order } from "./components/Order"
import { PendingOrders } from "./components/PendingOrders"
import type { Checkout, OrderItem, PendingOrder } from "./types"
import { formatPrice } from "./utils/formatPrice"
import {
    applyDiscount, getTotal, isDiscountValid, MAX_QUANTITY, MAX_RECREATION_ORDERS,
} from "./utils/order"

function App() {
    const [order, setOrder] = useState<OrderItem[]>([])
    const [pending, setPending] = useState<PendingOrder[]>([])
    const [discountCode, setDiscountCode] = useState("")
    const [message, setMessage] = useState("")
    // cambiando la key il form viene ricreato, quindi si svuota
    const [formKey, setFormKey] = useState(0)

    const total = getTotal(order)
    const discountValid = isDiscountValid(discountCode)
    const finalTotal = discountValid ? applyDiscount(total) : total
    const recreationOrders = pending.filter(o => o.checkout.ritiro === "a ricreazione").length
    const recreationFull = recreationOrders >= MAX_RECREATION_ORDERS

    function addProduct(id: number) {
        setOrder(prev => {
            const alreadyInOrder = prev.some(item => item.productId === id)
            if (alreadyInOrder) {
                return prev.map(item =>
                    item.productId === id && item.quantity < MAX_QUANTITY
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { productId: id, quantity: 1 }]
        })
    }

    function decreaseProduct(id: number) {
        setOrder(prev =>
            prev
                .map(item => item.productId === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter(item => item.quantity > 0)
        )
    }

    function markAsPickedUp(id: number) {
        setPending(prev => prev.filter(o => o.id !== id))
    }

    function confirmOrder(checkout: Checkout) {
        setMessage(
            `Ordine per ${checkout.nome} (${checkout.classe}), ritiro ${checkout.ritiro}, ${checkout.pagamento}: ${formatPrice(finalTotal)}`
        )
        setPending(prev => [
            ...prev,
            { id: Math.max(0, ...prev.map(o => o.id)) + 1, checkout, items: order, total: finalTotal },
        ])
        setOrder([])
        setDiscountCode("")
        setFormKey(prev => prev + 1)
    }

    return (
        <div className="max-w-xl mx-auto p-6 flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-center">Il bar della scuola</h1>
            <Menu order={order} onAdd={addProduct} />
            <Order
                order={order}
                total={total}
                finalTotal={finalTotal}
                discountCode={discountCode}
                discountValid={discountValid}
                onDiscountCodeChange={setDiscountCode}
                onIncrease={addProduct}
                onDecrease={decreaseProduct}
            />

            {message && (
                <p className="p-4 rounded-2xl bg-green-100 text-green-900 font-bold">{message}</p>
            )}

            <CheckoutForm
                key={formKey}
                total={finalTotal}
                orderEmpty={order.length === 0}
                recreationFull={recreationFull}
                onSubmit={confirmOrder}
            />

            <PendingOrders orders={pending} onPickedUp={markAsPickedUp} />
        </div>
    )
}

export default App