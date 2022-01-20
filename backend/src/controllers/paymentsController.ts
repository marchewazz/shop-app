import pool from '../util/postgresConfig';
import axios from 'axios';

import { bankBackend, mainShopBill } from '../util/utilities';

class PaymentsController{

    public async updatePayments(): Promise<any> {
        const client = await pool.connect();
        //WE ARE LOOKING FOR TRANSACTIONS HISTORY OF SHOP BILL 
        axios.get(`${bankBackend}/transactions/historybill`, {data: {accountNumber: mainShopBill}}).then(async (res: any) => {
            var transactions = JSON.parse(res.data.transactions);
            for (var transaction of transactions){

                var query = `SELECT "orderPrice" FROM orders WHERE "orderID" = $1;`;
                var { rows } = await client.query(query, [Number(transaction.note)]);
                //IF ORDERID MATCHES TRANSACTION NOTE AND TRANSACTION AMOUNT MATCHES ORDERPRICE
                //ORDER IS MARKED AS PAID
                if (rows[0].orderPrice == Number(transaction.amount)){
                    query = `UPDATE orders SET "orderIsPaid"=true WHERE "orderID"=$1;`;

                    client.query(query, [Number(transaction.note)]);
                }
            }
        }).catch((e: any) => {
            console.log(e);
        })
        client.release();
    }
}

export default PaymentsController;