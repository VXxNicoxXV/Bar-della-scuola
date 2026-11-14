import { useState } from "react"
import { CheckoutForm } from "./components/CheckoutForm"
import { Menu } from "./components/Menu"
import { Order } from "./components/Order"
import type { Checkout, OrderItem } from "./types"
import { formatPrice } from "./utils/formatPrice"
import { getTotal, MAX_QUANTITY } from "./utils/order"

function App() {
    const [order, setOrder] = useState<OrderItem[]>([])
    const [message, setMessage] = useState("")
    // cambiando la key il form viene ricreato, quindi si svuota
    const [formKey, setFormKey] = useState(0)

    const total = getTotal(order)

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

    function confirmOrder(checkout: Checkout) {
        setMessage(
            `Ordine per ${checkout.nome} (${checkout.classe}), ritiro ${checkout.ritiro}, ${checkout.pagamento}: ${formatPrice(total)}`
        )
        setOrder([])
        setFormKey(prev => prev + 1)
    }

    return (
        <div className="max-w-xl mx-auto p-6 flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-center">Il bar della scuola</h1>
            <Menu order={order} onAdd={addProduct} />
            <Order
                order={order}
                total={total}
                onIncrease={addProduct}
                onDecrease={decreaseProduct}
            />

            {message && (
                <p className="p-4 rounded-2xl bg-green-100 text-green-900 font-bold">{message}</p>
            )}

            <CheckoutForm key={formKey} orderEmpty={order.length === 0} onSubmit={confirmOrder} />
        </div>
    )
}

export default App