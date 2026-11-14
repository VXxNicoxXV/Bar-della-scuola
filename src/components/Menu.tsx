import { categories, menu } from "../data/menu"
import { formatPrice } from "../utils/formatPrice"

type MenuProps = {
    onAdd: (id: number) => void
}

export function Menu({ onAdd }: MenuProps) {
    return (
        <div className="flex flex-col gap-8">
            {categories.map(category => (
                <section key={category}>
                    <h2 className="text-2xl font-bold capitalize mb-3">{category}</h2>
                    <div className="flex flex-col gap-3">
                        {menu.filter(product => product.category === category).map(product => (
                            <div key={product.id} className="flex justify-between items-center px-4 py-3 border border-gray-300 rounded-2xl">
                                <div>
                                    <p className="font-bold">{product.name}</p>
                                    <p className="text-gray-500">{formatPrice(product.price)}</p>
                                </div>
                                <button
                                    className="px-5 py-2 rounded-full bg-blue-500 text-white"
                                    onClick={() => onAdd(product.id)}
                                >Aggiungi</button>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}