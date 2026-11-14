import type { Checkout } from "../types"

export const MAX_NOTE_LENGTH = 100

export type CheckoutErrors = {
    nome: string[]
    classe: string[]
    note: string[]
}

export function validateCheckout(checkout: Checkout): CheckoutErrors {
    const nome: string[] = []
    const classe: string[] = []
    const note: string[] = []

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

    return { nome, classe, note }
}

export function hasErrors(errors: CheckoutErrors): boolean {
    return Object.values(errors).some(list => list.length > 0)
}