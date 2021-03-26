module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": {
        "rejectUnauthorized": false
    },
    "migrations": [
        `${process.env.MIGRATIONS_DIR}`
    ],
    "entities": [
        `${process.env.ENTITIES_DIR}`
    ],
    "logging": false,
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "src/models"
    }
}