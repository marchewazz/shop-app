import pool from '../util/postgresConfig';
import crypto from 'crypto';

import { returnServerError } from '../util/utilities';

class AccountsController {

    public async registerAccounts(req: any, res: any, next: any){
        const userData = req.body.params;
        
        try {
            const client = await pool.connect();
            var query = `SELECT * FROM users WHERE "userEmail" = $1`;

            var { rows } = await client.query(query, [userData.accountEmail]);

            if (rows.length == 0) {
                query = `INSERT INTO users(
                    "userFirstName", "userLastName", "userCity", "userPass", "userBankAccNumber", "userEmail", "userCreateDate")               
                    VALUES
                    ($1, $2, $3, $4, $5, $6, LOCALTIMESTAMP)
                    `
                console.log(userData);
                const values = [
                    userData.accountFirstName, 
                    userData.accountLastName, 
                    userData.accountCity, 
                    crypto.createHash('sha256').update(userData.accountPassword).digest('base64'), 
                    null, 
                    userData.accountEmail
                ]
                const { rows } = await client.query(query,values);
                return res.status(200).json({"message":"You've been registered!"});
            } else {
                return res.status(200).json({"message":"You're email exists in DB!"});
            }
        } catch(e){
            console.log(e);
            return returnServerError(res);
        }
    }

    public async loginUser(req: any, res: any){

        try{
            const userData = req.query;
            console.log(userData);

            const client = await pool.connect();
            var query = `SELECT * FROM users WHERE "userEmail" = $1`;

            var { rows } = await client.query(query, [userData.accountEmail]);
            console.log(rows);
            const result = rows[0]

            if (!result){
                return res.status(200).json({"message":"Your email doesn't exist in DB!"});
            } else {
                console.log(result);
                console.log(crypto.createHash('sha256').update(userData.accountPassword).digest('base64'));
                
                if (result.userPass !== crypto.createHash('sha256').update(userData.accountPassword).digest('base64')){
                    return res.status(200).json({"message":"Wrong password"})
                } else {
                    return res.status(200).json({"message":"Logged!", "userData": result, "token": "sometoken"})
                }
            }
        } catch(e){
            console.log(e);
            return returnServerError(res);
        }
    }
}

export default AccountsController;