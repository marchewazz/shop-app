import pool from '../util/postgresConfig';

class AccountsController {

    public async registerAccounts(req: any, res: any){
        try {
            const client = await pool.connect();

            const query = "SELECT * FROM test";
            const { rows } = await client.query(query);

            client.release();

            res.send(rows);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default AccountsController;