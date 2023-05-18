import { Entity } from "../../../kernel/types"

export type Item = Entity<number> & {
    name: string,
    price: number,
    description: string,
    image?: string | null
}