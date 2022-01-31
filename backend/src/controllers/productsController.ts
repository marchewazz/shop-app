import pool from '../util/postgresConfig';
import { returnServerError } from '../util/utilities';

export default class ProductsController{

    public async getAllProducts(req: any, res: any){
        const client = await pool.connect();
        try {
            //SIMPLY GETTING PRODUCTS
            const query = `SELECT * FROM products`;

            var { rows } = await client.query(query);
            res.send({"products": rows})
        } catch(e){
            return returnServerError(res);
        } finally {
            client.release();
        }
    }

    public async getSpecificProduct(req: any, res: any){
        const client = await pool.connect();
        try {
            //SIMPLY GETTING ONE PRODUCT
            const productID = req.query.productID

            const query = `SELECT * FROM products 
                        INNER JOIN "suppliers"
                        ON "productSupplier" = "supplierID"
                        WHERE "productID" = $1`;

            var { rows } = await client.query(query, [productID]);
            res.send({"product": rows})
        } catch(e){
            return returnServerError(res);
        } finally {
            client.release()
        }
    }

    public async getProductsFromSupplier(req: any, res: any){
        const client = await pool.connect();
        try {            
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
        } finally {
            client.release();
        }
    }

    public async setProductsSoldQuantity(productID: any, quantity: any){
        const client = await pool.connect();
        try {            
            const query = `UPDATE products SET "productSold" = "productSold" + $1 WHERE "productID" = $2`;

            await client.query(query, [quantity, productID]);
        } catch(e){
            console.log(e);
        } finally {
            client.release();
        }
    }
}