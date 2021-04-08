export interface User {
    _id: string,
    id: string,
    name: {
        first: string,
        second: string,
    },
    email: string,
    address: {
        city: string,
        street: string,
    },
    lastCartId: string,
}