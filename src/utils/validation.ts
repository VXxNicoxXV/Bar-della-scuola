import type { Checkout } from "../types"
import { formatPrice } from "./formatPrice"

export const MAX_NOTE_LENGTH = 100
export const MIN_CARD_TOTAL = 3

export type CheckoutErrors = {
    nome: string[]
    classe: string[]
    note: string[]
    pagamento: string[]
    ordine: string[]
}

type ValidationContext = {
    total: number
    orderEmpty: boolean
}

export function validateCheckout(checkout: Checkout, context: ValidationContext): CheckoutErrors {
    const nome: string[] = []
    const classe: string[] = []
    const note: string[] = []
    const pagamento: string[] = []
    const ordine: string[] = []

    const name = checkout.nome.trim()
    if (name === "") {
        nome.push("Il nome è obbligatorio")
    } else {
        if (name.length < 2) nome.push("Il nome deve avere almeno 2 caratteri")
        if (/\d/.test(name)) nome.push("Il nome non può contenere numeri")
    }

    if (checkout.classe === "") {
        classe.push("La classe è obbligatoria")
    } else if (!/^[1-5][A-Z]$/.test(checkout.classe)) {
        classe.push("Formato non valido: un numero da 1 a 5 e una lettera maiuscola (es. 4B)")
    }

    if (checkout.note.length > MAX_NOTE_LENGTH) {
        note.push(`Le note possono avere al massimo ${MAX_NOTE_LENGTH} caratteri`)
    }

    if (checkout.pagamento === "carta" && context.total < MIN_CARD_TOTAL) {
        pagamento.push(`Con la carta l'importo minimo è ${formatPrice(MIN_CARD_TOTAL)}`)
    }

    if (context.orderEmpty) {
        ordine.push("L'ordine è vuoto")
    }

    return { nome, classe, note, pagamento, ordine }
}

export function hasErrors(errors: CheckoutErrors): boolean {
    return Object.values(errors).some(list => list.length > 0)
}