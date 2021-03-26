export default {
    type: "postgres",
    url: process.env.DATABASE_URL_TEST,
    migrations: [
        "../database/migrations/*.ts"
    ],
    entities: [
        "../models/*.ts"
    ],
    logging: false,
    cli: {
        "migrationsDir": "src/database/migrations"
    }
}