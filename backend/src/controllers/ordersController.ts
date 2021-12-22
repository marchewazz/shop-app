import pool from '../util/postgresConfig';
import { returnServerError } from '../util/utilities';

export default class OrdersController{
    public async addOrder(req: any, res: any){
        try {
            const client = await pool.connect();

            const orderData = req.body.params;
            var values = [orderData.price, orderData.products, orderData.city, orderData.firstName, orderData.lastName]
            var query = `INSERT INTO orders(
                "orderPrice", "orderDate", "orderProducts", "orderIsPaid", "orderAddress", "orderOrdererName", "orderOrdererLastName")
                VALUES ($1, LOCALTIMESTAMP, $2, false, $3, $4, $5) RETURNING "orderID"`;
            
            const { rows } = await client.query(query, values);
            if (orderData.userID != ""){
                query = `UPDATE users SET "userOrders" = array_append("userOrders", $1) WHERE "userID" = $2`;
                values = [rows[0].orderID, orderData.userID];
                
                await client.query(query, values);
            }

            return res.status(200).json({"message": "ordered", "orderID": rows[0].orderID})

        }catch(e) {
            console.log(e);
            return returnServerError(res);
        }
    }
}