import pool from '../util/postgresConfig';

export default class ProductsController{
    public async getAllProducts(req: any, res: any){
        try {

            const client = await pool.connect();
            const query = `SELECT * FROM products`;

            var { rows } = await client.query(query);

        } catch(e){
            res.send({"message":"Server error!"});
        } finally {
            res.send({"products": rows})
        }
    }
}