export interface Response {
    succes: boolean;
    items:  Item[];
}

export interface Item {
    codStatus:   number;
    resVariable: string;
}