import { useState, type FormEvent } from "react"
import type { Checkout, Payment, Pickup } from "../types"
import { cn } from "../utils/cn"

type CheckoutFormProps = {
    orderEmpty: boolean
    onSubmit: (checkout: Checkout) => void
}

const pickups: Pickup[] = ["a ricreazione", "a pranzo"]
const payments: Payment[] = ["contanti", "carta"]

const emptyCheckout: Checkout = {
    nome: "",
    classe: "",
    ritiro: "a ricreazione",
    pagamento: "contanti",
    note: "",
}

export function CheckoutForm({ orderEmpty, onSubmit }: CheckoutFormProps) {
    const [form, setForm] = useState<Checkout>(emptyCheckout)

    function updateText(field: "nome" | "classe" | "note", value: string) {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Conferma ordine</h2>

            <input
                placeholder="Nome"
                value={form.nome}
                onChange={e => updateText("nome", e.target.value)}
                className="bg-gray-200 px-5 py-3 rounded-full"
            />

            <input
                placeholder="Classe (es. 4B)"
                value={form.classe}
                onChange={e => updateText("classe", e.target.value)}
                className="bg-gray-200 px-5 py-3 rounded-full"
            />

            <div className="flex gap-3">
                {pickups.map(pickup => (
                    <button
                        type="button"
                        key={pickup}
                        onClick={() => setForm(prev => ({ ...prev, ritiro: pickup }))}
                        className={cn("px-4 py-2 rounded-full bg-gray-300 capitalize", {
                            "bg-blue-500 text-white": form.ritiro === pickup,
                        })}
                    >{pickup}</button>
                ))}
            </div>

            <div className="flex gap-3">
                {payments.map(payment => (
                    <button
                        type="button"
                        key={payment}
                        onClick={() => setForm(prev => ({ ...prev, pagamento: payment }))}
                        className={cn("px-4 py-2 rounded-full bg-gray-300 capitalize", {
                            "bg-blue-500 text-white": form.pagamento === payment,
                        })}
                    >{payment}</button>
                ))}
            </div>

            <textarea
                placeholder="Note (facoltative)"
                value={form.note}
                onChange={e => updateText("note", e.target.value)}
                rows={3}
                className="bg-gray-200 px-5 py-3 rounded-2xl"
            />

            <button
                type="submit"
                disabled={orderEmpty}
                className="self-start px-6 py-3 rounded-full bg-blue-500 text-white disabled:opacity-40"
            >Conferma ordine</button>
        </form>
    )
}