import pool from '../util/postgresConfig';
import crypto from 'crypto';

class AccountsController {

    public async registerAccounts(req: any, res: any){
        const userData = req.body;
        try {

            const client = await pool.connect();
            const query = `SELECT * FROM users WHERE "userEmail" = $1`;

            var { rows } = await client.query(query, [userData.accountEmail]);

        } catch(e){
            res.send({"message":"Server error!"});
        } finally {
            if (rows.length == 0) {
                try {
                    const client = await pool.connect();
                    const query = `INSERT INTO users(
                        "userFirstName", "userLastName", "userCity", "userPass", "userBankAccNumber", "userEmail", "userCreateDate")               
                        VALUES
                        ($1, $2, $3, $4, $5, $6, LOCALTIMESTAMP)
                        `
                    const values = [
                        userData.accountFirstName, 
                        userData.accountLastName, 
                        userData.accountCity, 
                        crypto.createHash('sha256').update(userData.accountPassword).digest('base64'), 
                        null, 
                        userData.accountEmail
                    ]
                    const { rows } = await client.query(query,values);
                } catch(e){
                    res.send({"message":"Server error!"});
                } finally {
                    res.send({"message":"You've been registered!"});
                }
             } else {
                res.send({"message":"You're email exists in DB!"});
             }
        }
    }
}

export default AccountsController;