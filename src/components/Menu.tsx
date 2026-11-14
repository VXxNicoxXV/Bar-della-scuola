import { categories, menu } from "../data/menu"
import type { OrderItem } from "../types"
import { formatPrice } from "../utils/formatPrice"
import { MAX_QUANTITY } from "../utils/order"

type MenuProps = {
    order: OrderItem[]
    onAdd: (id: number) => void
}

export function Menu({ order, onAdd }: MenuProps) {
    return (
        <div className="flex flex-col gap-8">
            {categories.map(category => (
                <section key={category}>
                    <h2 className="text-2xl font-bold capitalize mb-3">{category}</h2>
                    <div className="flex flex-col gap-3">
                        {menu.filter(product => product.category === category).map(product => {
                            const quantity = order.find(item => item.productId === product.id)?.quantity ?? 0

                            return (
                                <div key={product.id} className="flex justify-between items-center px-4 py-3 border border-gray-300 rounded-2xl">
                                    <div>
                                        <p className="font-bold">{product.name}</p>
                                        <p className="text-gray-500">{formatPrice(product.price)}</p>
                                    </div>
                                    <button
                                        className="px-5 py-2 rounded-full bg-blue-500 text-white disabled:opacity-40"
                                        disabled={quantity >= MAX_QUANTITY}
                                        onClick={() => onAdd(product.id)}
                                    >Aggiungi</button>
                                </div>
                            )
                        })}
                    </div>
                </section>
            ))}
        </div>
    )
}