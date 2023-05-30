import { Entity } from "../../../kernel/types";

export type AuthUser = Entity<number>&{
    username: string,
    password: string,
    token?: string,
    role?: string
}