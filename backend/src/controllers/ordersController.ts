import pool from '../util/postgresConfig';

import { bankPage, returnServerError } from '../util/utilities';
import MailingController from './mailingController';

export default class OrdersController{
    public async addOrder(req: any, res: any){
        try {
            const client = await pool.connect();

            const orderData = req.body.params;
            var values = [orderData.price, orderData.products, orderData.city, orderData.firstName, orderData.lastName]
            //SIMPLY INSERT ORDER
            var query = `INSERT INTO orders(
                "orderPrice", "orderDate", "orderProducts", "orderIsPaid", "orderAddress", "orderOrdererName", "orderOrdererLastName")
                VALUES ($1, LOCALTIMESTAMP, $2, false, $3, $4, $5) RETURNING "orderID"`;
            
            const { rows } = await client.query(query, values);
            //IF USER WAS LOGGED WE CAN INSERT ORDERID TO ITS ORDER ARRAY
            if (orderData.userID != ""){
                query = `UPDATE users SET "userOrders" = array_append("userOrders", $1) WHERE "userID" = $2`;
                values = [rows[0].orderID, orderData.userID];
                
                await client.query(query, values);
            }
            new MailingController().sendMail({
                from: "shop.app4321@gmail.com",
                to: orderData.email,
                subject: `Order confirmation`,
                html: `<!DOCTYPE html>
                <html>
                    <h2>
                        You order has been received! Order no. ${rows[0].orderID}
                    </h2>

                    <h4>
                        If you haven't paid yet you should do this within the next 24 hours!
                        You can click <a href="${bankPage}">here</a> to go straight on bank page! 
                    </h4>
                </html>
                `,
            })
            return res.status(200).json({"message": "ordered", "orderID": rows[0].orderID})

        }catch(e) {
            console.log(e);
            return returnServerError(res);
        }
    }

    public async getAllOrders(req: any, res: any){
        try {
            const client = await pool.connect();

            const userID = req.body.params.userID;

            console.log(userID);
            //WE SELECT ORDERS ARRAY FROM USER
            var query = `SELECT "userOrders" FROM "users" WHERE "userID" = $1`

            var { rows } = await client.query(query, [userID]);

            console.log(rows[0].userOrders);
            //LOOKING FOR ORDERS WITH ID EQUALS TO ANY ELEMENT IN ORDERS ARRAY
            query = `SELECT * FROM "orders" WHERE "orderID" = ANY($1)`;

            var { rows } = await client.query(query, [rows[0].userOrders]);

            console.log(rows);

            return res.status(200).json({"orders": rows})
        } catch(e){
            console.log(e);
            return returnServerError(res);
        }
    }

    public async cancelOrder(req: any, res: any){
        try{

            const client = await pool.connect();

            const orderID = req.body.params.orderID;
            //JUST DELETE :D
            var query = `DELETE from "orders" WHERE "orderID" = $1`;

            var { rows } = await client.query(query, [orderID]);

            return res.status(200).json({"message":"Deleted!"})
        } catch(e){
            return returnServerError(res)
        }
    }
}