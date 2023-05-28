export type Entity <Tidentifier extends number | string>={
    id?: Tidentifier;
}

export type ResponseApi<T>={
    code: number,
    error?: boolean,
    message?: string,
    // data?: T | T[],
    entity?: T,
    entities?: T[],
    count?: number;
}