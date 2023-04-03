require('dotenv').config()

const MONGO_DB_CONFIG = {
    DB: process.env.MONGO_DB_CONNECTION,
    PAGE_SIZE: 10,
}

module.exports = {
    MONGO_DB_CONFIG
}