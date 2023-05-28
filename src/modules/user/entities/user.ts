import { Entity } from "../../../kernel/types";

export type User= Entity<number> &{
    username: string,
    password: string,
    role: string
}