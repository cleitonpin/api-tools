import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    
    const optionsDatabasePostTest: PostgresConnectionOptions = {
        ssl: true,
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        dropSchema: true,
        password: "post",
        database: "toolsdatabase_test",
        migrations: ["./src/database/migrations/*.ts"],
        entities: ["./src/models/*.ts"],
        logging: false,
        cli: {
            "migrationsDir": "./src/database/migrations"
        }
    }

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === 'test'
                    ? optionsDatabasePostTest.database
                    : defaultOptions.database
        })
    );
}

