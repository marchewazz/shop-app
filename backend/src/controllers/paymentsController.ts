import pool from '../util/postgresConfig';
import axios from 'axios';

import { bankBackend, mainShopBill, returnServerError } from '../util/utilities';

class PaymentsController{

    public async updatePayments(): Promise<any> {

        axios.get(`${bankBackend}/transaction/historybill`, {data: {accountNumber: mainShopBill}}).then(async (res: any) => {
            var bills = JSON.parse(res.data.bills);
            for (var bill of bills){
                const client = await pool.connect();

                const query = `UPDATE orders SET "orderIsPaid"=true WHERE "orderID"=$1;`

                client.query(query, [Number(bill.note)]);
            }
        }).catch((e: any) => {
            console.log(e);
        })
    }
}

export default PaymentsController;