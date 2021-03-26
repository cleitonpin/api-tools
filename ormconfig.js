module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": {
        "rejectUnauthorized": false
    },
    "migrations": ["dist/database/migrations/*.js"],
    "entities": ["dist/models/*.js"],
    "logging": false,
    "cli": {
        "migrationsDir": "./src/database/migrations"
    }
}