import { Pool } from 'pg';

const connectionString : string | undefined = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/shopApp';

export default new Pool ({
    connectionString: connectionString,
    max: 20000
})