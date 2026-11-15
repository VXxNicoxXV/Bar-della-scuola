import { menu } from "../data/menu"
import type { PendingOrder } from "../types"
import { formatPrice } from "../utils/formatPrice"

type PendingOrdersProps = {
    orders: PendingOrder[]
    onPickedUp: (id: number) => void
}

export function PendingOrders({ orders, onPickedUp }: PendingOrdersProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-3">Da ritirare</h2>

            {orders.length === 0 && <p className="text-gray-500">Nessun ordine da ritirare.</p>}

            <div className="flex flex-col gap-3">
                {orders.map(order => (
                    <div key={order.id} className="flex justify-between items-center gap-4 px-4 py-3 border border-gray-300 rounded-2xl">
                        <div>
                            <p className="font-bold">{order.checkout.nome} ({order.checkout.classe})</p>
                            <p className="text-gray-500">Ritiro {order.checkout.ritiro}</p>
                            <p>
                                {order.items.map(item => {
                                    const product = menu.find(p => p.id === item.productId)
                                    return `${item.quantity}x ${product?.name}`
                                }).join(", ")}
                            </p>
                            <p className="font-bold">{formatPrice(order.total)}</p>
                        </div>
                        <button
                            className="px-5 py-2 rounded-full bg-blue-500 text-white"
                            onClick={() => onPickedUp(order.id)}
                        >Ritirato</button>
                    </div>
                ))}
            </div>
        </section>
    )
}