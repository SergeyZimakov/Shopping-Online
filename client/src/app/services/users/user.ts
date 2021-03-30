export interface User {
    _id: String,
    id: String,
    name: {
        first: String,
        second: String,
    },
    email: String,
    address: {
        city: String,
        street: String,
    },
    carts: [],
}