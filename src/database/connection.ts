import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import database_test from '../config/database_test';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === 'test'
                    ? database_test : defaultOptions.database
        })
    );
}

