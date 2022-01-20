import pool from '../util/postgresConfig';
import crypto from 'crypto';

import { returnServerError } from '../util/utilities';

class AccountsController {

    public async registerAccounts(req: any, res: any, next: any){

        const userData = req.body.params;
        const client = await pool.connect();
        try {
            //CHECK FOR USER WITH PASSED EMAIL
            var query = `SELECT * FROM users WHERE "userEmail" = $1`;

            var { rows } = await client.query(query, [userData.accountEmail]);

            if (rows.length == 0) {
                //IF THERE IS NO USER WITH THIS EMAIL WE CAN INSERT NEW
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
                //OTHERWISE RETURN CORRECT MESSAGE
                return res.status(200).json({"message":"You're email exists in DB!"});
            }
        } catch(e){
            console.log(e);
            return returnServerError(res);
        } finally {
            client.release()
        }
    }

    public async loginUser(req: any, res: any){
        const client = await pool.connect();
        try{
            const userData = req.query;
            //CHECK FOR USER WITH PASSED EMAIL
            var query = `SELECT * FROM users WHERE "userEmail" = $1`;

            var { rows } = await client.query(query, [userData.accountEmail]);
            console.log(rows);
            const result = rows[0]

            if (!result){
                //IF THERE IS NO USER WITH THIS EMAIL RETURN MESSAGE
                return res.status(200).json({"message":"Your email doesn't exist in DB!"});
            } else {
                console.log(result);
                console.log(crypto.createHash('sha256').update(userData.accountPassword).digest('base64'));
                //JUST CHECK IS PASSWORDS MATCH
                if (result.userPass !== crypto.createHash('sha256').update(userData.accountPassword).digest('base64')){
                    return res.status(200).json({"message":"Wrong password"})
                } else {
                    return res.status(200).json({"message":"Logged!", "userData": result, "token": "sometoken"})
                }
            }
        } catch(e){
            console.log(e);
            return returnServerError(res);
        } finally {
            client.release();
        }
    }

    public async refreshUserDate(req: any, res: any){
        const client = await pool.connect();
        try{
            var query = `SELECT * FROM users WHERE "userID" = $1`;

            var { rows } = await client.query(query, [req.body.params.userID]);
            const result = rows[0];
            return res.status(200).json({"userData": result})
        } catch(e){
            console.log(e);
        } finally {
            client.release();
        }
    }

    public async updateBankNumber(req: any, res: any){
        const client = await pool.connect();
        try{
            const userData = [req.body.params.userEmail, req.body.params.accountNumber];
            var query = `UPDATE users SET "userBankAccNumber" = $2 WHERE "userEmail" = $1`;

            await client.query(query, userData);
            // res.send({"x": "hjehe"})
        } catch(e){
            console.log(e);
            return returnServerError(res);
        }
        client.release();
    }
}

export default AccountsController;