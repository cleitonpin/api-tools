export default {
    type: "postgres",
    ssl: {
        rejectUnauthorized: false,
    },
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || "localhost",
    port:  process.env.DB_PORT ||"5432",
    username:  process.env.DB_USERNAME ||"postgres",
    password:  process.env.DB_PASSWORD ||"post",
    database:  process.env.DB_NAME ||"toolsdatabase",
    migrations: ["./src/database/migrations/*.ts"],
    entities: ["./src/models/*.ts"],
    logging: false,
    cli: {
        "migrationsDir": "./src/database/migrations"
    }
}