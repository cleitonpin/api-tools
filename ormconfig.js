module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": {
        "rejectUnauthorized": false
    },
    "migrations": ["dist/src/database/migrations/*.js"],
    "entities": ["dist/src/models/*.js"],
    "logging": false,
    "cli": {
        "migrationsDir": "./src/database/migrations",
        "entitiesDir": "src/models"
    }
}