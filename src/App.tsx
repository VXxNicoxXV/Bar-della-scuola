import { useState } from "react"
import { Menu } from "./components/Menu"
import { Order } from "./components/Order"
import type { OrderItem } from "./types"
import { getTotal } from "./utils/order"

function App() {
    const [order, setOrder] = useState<OrderItem[]>([])

    function addProduct(id: number) {
        setOrder(prev => {
            const alreadyInOrder = prev.some(item => item.productId === id)
            if (alreadyInOrder) {
                return prev.map(item =>
                    item.productId === id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { productId: id, quantity: 1 }]
        })
    }

    return (
        <div className="max-w-xl mx-auto p-6 flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-center">Il bar della scuola</h1>
            <Menu onAdd={addProduct} />
            <Order order={order} total={getTotal(order)} />
        </div>
    )
}

export default App