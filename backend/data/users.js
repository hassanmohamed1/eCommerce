import bcrypt from "bcryptjs"

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Hassan Mohamed",
        email: "hassan@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Nandez Adde",
        email: "nandez@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
]

export default users