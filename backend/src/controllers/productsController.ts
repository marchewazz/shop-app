import pool from '../util/postgresConfig';
import { returnServerError } from '../util/utilities';

export default class ProductsController{

    public async getAllProducts(req: any, res: any){
        try {
            //SIMPLY GETTING PRODUCTS
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
            //SIMPLY GETTING ONE PRODUCT
            const client = await pool.connect();

            const productID = req.query.productID

            const query = `SELECT * FROM products 
                        INNER JOIN "suppliers"
                        ON "productSupplier" = "supplierID"
                        WHERE "productID" = $1`;

            var { rows } = await client.query(query, [productID]);
            res.send({"product": rows})
        } catch(e){
            return returnServerError(res);
        }
    }

    public async getProductsFromSupplier(req: any, res: any){
        try {
            const client = await pool.connect();
            
            const productID = req.body.params.supplierID;
            console.log(productID);
            

            const query = `SELECT * FROM products  
                        INNER JOIN "suppliers"
                        ON "productSupplier" = "supplierID"
                        WHERE "productSupplier" = $1`;

            var { rows } = await client.query(query, [productID]);

            return res.status(200).json({"message": "got", "products": rows})
        } catch(e){
            console.log(e);
            return returnServerError(res);
        }
    }
}