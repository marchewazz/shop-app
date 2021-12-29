import pool from '../util/postgresConfig';
import axios from 'axios';

import { bankBackend, mainShopBill, returnServerError } from '../util/utilities';

class PaymentsController{

    public async updatePayments(): Promise<any> {

        axios.get(`${bankBackend}/transaction/historybill`, {data: {accountNumber: mainShopBill}}).then(async (res: any) => {
            var transactions = JSON.parse(res.data.transactions);
            const client = await pool.connect();
            for (var transaction of transactions){

                var query = `SELECT "orderPrice" FROM orders WHERE "orderID" = $1;`;
                var { rows } = await client.query(query, [Number(transaction.note)]);
                if (rows[0].orderPrice == Number(transaction.amount)){
                    query = `UPDATE orders SET "orderIsPaid"=true WHERE "orderID"=$1;`;

                    client.query(query, [Number(transaction.note)]);
                }
            }
        }).catch((e: any) => {
            console.log(e);
        })
    }
}

export default PaymentsController;