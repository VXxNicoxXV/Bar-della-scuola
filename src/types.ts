export type OrderItem = {
    productId: number
    quantity: number
}

export type Pickup = "a ricreazione" | "a pranzo"
export type Payment = "contanti" | "carta"

export type Checkout = {
    nome: string
    classe: string
    ritiro: Pickup
    pagamento: Payment
    note: string
}