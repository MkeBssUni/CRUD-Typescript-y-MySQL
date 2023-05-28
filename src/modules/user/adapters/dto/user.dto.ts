export type SaveUserDto={
    username: string,
    password: string,
    role: string
}


export type UpdateUserDto={
    id: number,
    username?: string,
    password: string,
    role?: string
}

export type LoginUserDto={
    username: string,
    password: string
}