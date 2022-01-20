import pool from '../util/postgresConfig';

import { bankPage, returnServerError } from '../util/utilities';
import MailingController from './mailingController';

export default class OrdersController{
    public async addOrder(req: any, res: any){
        const client = await pool.connect();
        try {
            const orderData = req.body.params;
            var values = [orderData.price, orderData.products, orderData.city, orderData.firstName, orderData.lastName, orderData.userID]
            //SIMPLY INSERT ORDER
            var query = `INSERT INTO orders(
                "orderPrice", "orderDate", "orderProducts", "orderIsPaid", "orderAddress", "orderOrdererName", "orderOrdererLastName", "orderUser")
                VALUES ($1, LOCALTIMESTAMP, $2, false, $3, $4, $5, $6) RETURNING "orderID"`;
            
            const { rows } = await client.query(query, values);
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
            return res.status(200).json({"message": "ordered"})
        }catch(e) {
            console.log(e);
            return returnServerError(res);
        } finally {
            client.release();
        }
    }

    public async getAllOrders(req: any, res: any){
        const client = await pool.connect();
        try {
            const userID = req.body.params.userID;
            
            var query = `SELECT * FROM "orders" WHERE "orderUser" = $1`;

            var { rows } = await client.query(query, [userID]);

            return res.status(200).json({"orders": rows})
        } catch(e){
            console.log(e);
            return returnServerError(res);
        } finally {
            client.release();
        }
    }

    public async cancelOrder(req: any, res: any){
        const client = await pool.connect();
        try{
            const orderID = req.body.params.orderID;
            //JUST DELETE :D
            var query = `DELETE from "orders" WHERE "orderID" = $1`;

            await client.query(query, [orderID]);

            return res.status(200).json({"message":"Deleted!"})
        } catch(e){
            return returnServerError(res)
        } finally {
            client.release()
        }
    }

    public async updateOrders(){
        const client = await pool.connect();
        try{
            var query = `DELETE FROM "orders" WHERE DATE_PART('day', LOCALTIMESTAMP::timestamp - "orderDate"::timestamp) > 0`;

            await client.query(query);
        } catch(e){
            console.log(e);
        } finally {
            client.release();
        }
    }
}