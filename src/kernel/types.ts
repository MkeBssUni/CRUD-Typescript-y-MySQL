export type Entity <Tidentifier extends number | string>={
    id?: Tidentifier;
}

export type ReponseApi<T>={
    code: number,
    error?: boolean,
    message?: string,
    entity?: T,
    entities?: T[],
    count?: number;
}