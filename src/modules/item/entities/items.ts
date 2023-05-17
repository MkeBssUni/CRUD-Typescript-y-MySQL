import { Entity } from "../../../kernel/types"

export type Item = Entity<number> & {
    name: String,
    price: number,
    description: String,
    image?: String | null
}