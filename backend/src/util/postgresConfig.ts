import { Pool } from 'pg';

const connectionString : string | undefined = process.env.DATABASE_URL;

export default new Pool ({
    connectionString: connectionString,
    max: 20000
})