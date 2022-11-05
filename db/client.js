const { Client } = require('pg')

const DB_NAME = 'pern-todo-app'

const DB_URL =
    process.env.DATABASE_URL || `postgress://localhost:5432/${DB_NAME}`

let client;

if (process.env.CI) {
    client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
    })
} else {
    client = new Client(DB_URL)
}

module.eports = client;