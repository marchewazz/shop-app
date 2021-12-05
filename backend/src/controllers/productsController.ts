import pool from '../util/postgresConfig';
import { returnServerError } from '../util/utilities';

export default class ProductsController{

    public async getAllProducts(req: any, res: any){
        try {

            const client = await pool.connect();
            const query = `SELECT * FROM products`;

            var { rows } = await client.query(query);
            res.send({"products": rows})
        } catch(e){
            return returnServerError(res);
        }
    }

    public async getSpecificProduct(req: any, res: any){

        console.log(req.query);
        try {
            
            const client = await pool.connect();

            const productID = req.query.productID

            const query = `SELECT * FROM products WHERE "productID" = $1`;

            var { rows } = await client.query(query, [productID]);
            res.send({"product": rows})
        } catch(e){
            return returnServerError(res);
        }
    }
}