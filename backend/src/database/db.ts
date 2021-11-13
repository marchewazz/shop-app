import { Pool } from 'pg';

export default async function main(){
    const client = new Pool ({
        connectionString: 'postgres://postgres:123@localhost:5432/shopApp'
    })

    client.connect();

    const query = "SELECT * FROM test";

    const { rows } = await client.query(query);

    const result = rows;
    
    return result
}