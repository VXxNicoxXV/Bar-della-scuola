import { menu } from "../data/menu"
import type { OrderItem } from "../types"
import { formatPrice } from "../utils/formatPrice"
import { MAX_QUANTITY } from "../utils/order"

type OrderProps = {
    order: OrderItem[]
    total: number
    finalTotal: number
    discountCode: string
    discountValid: boolean
    onDiscountCodeChange: (code: string) => void
    onIncrease: (id: number) => void
    onDecrease: (id: number) => void
}

export function Order({
    order, total, finalTotal, discountCode, discountValid,
    onDiscountCodeChange, onIncrease, onDecrease,
}: OrderProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-3">Il tuo ordine</h2>

            {order.length === 0 && <p className="text-gray-500">Nessun prodotto nell'ordine.</p>}

            <div className="flex flex-col gap-3">
                {order.map(item => {
                    const product = menu.find(p => p.id === item.productId)
                    if (!product) return null
                    return (
                        <div key={item.productId} className="flex justify-between items-center">
                            <p className="font-bold flex-1">{product.name}</p>
                            <div className="flex items-center gap-3 mr-4">
                                <button
                                    className="w-9 h-9 rounded-full bg-gray-200"
                                    onClick={() => onDecrease(item.productId)}
                                >−</button>
                                <span className="w-4 text-center">{item.quantity}</span>
                                <button
                                    className="w-9 h-9 rounded-full bg-gray-200 disabled:opacity-40"
                                    disabled={item.quantity >= MAX_QUANTITY}
                                    onClick={() => onIncrease(item.productId)}
                                >+</button>
                            </div>
                            <p className="w-24 text-right">{formatPrice(product.price * item.quantity)}</p>
                        </div>
                    )
                })}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-300 flex flex-col items-end gap-1">
                {discountValid && (
                    <>
                        <p>Subtotale: {formatPrice(total)}</p>
                        <p className="text-green-700">Sconto 10%: −{formatPrice(total - finalTotal)}</p>
                    </>
                )}
                <p className="text-xl font-bold">Totale: {formatPrice(finalTotal)}</p>
            </div>

            <input
                placeholder="Codice sconto"
                value={discountCode}
                onChange={e => onDiscountCodeChange(e.target.value)}
                className="mt-4 w-full bg-gray-200 px-5 py-3 rounded-full"
            />
            {discountCode.trim() !== "" && !discountValid && (
                <p className="text-sm text-red-600 px-2 mt-1">Codice sconto non valido</p>
            )}
            {discountValid && <p className="text-sm text-green-700 px-2 mt-1">Codice applicato!</p>}
        </section>
    )
}