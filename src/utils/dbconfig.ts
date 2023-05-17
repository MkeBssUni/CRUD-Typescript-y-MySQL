import { Pool } from "pg";

export const pool = new Pool({
    user:"root",
    host:"localhost",
    password: "root",
    database: "menu",
    port: 5432
})