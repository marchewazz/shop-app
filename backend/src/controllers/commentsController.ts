import pool from '../util/postgresConfig';

export default class CommentsController{
    async addComment(req: any, res: any){
        const client = await pool.connect();
        try {
            const commentData = req.body.params;
            console.log(commentData);

            var query = `INSERT INTO comments(
                "userID", "rating", "commentText", "productID", "userName", "commentDate"
                )
                VALUES ($1, $2, $3, $4, $5, LOCALTIMESTAMP);`
            
            await client.query(query, [commentData.userID, commentData.rating, commentData.commentText, commentData.productID, commentData.userName]);
            return res.status(200).json({"message": "inserted"})
        } catch(e){
            console.log(e);
        } finally {
            client.release();
        }
    }

    async deleteComment(req: any, res: any){
        const client = await pool.connect();
        try {
            const commentID = req.body.params.commentID;
            console.log(commentID);

            const query = `DELETE FROM "comments" WHERE "commentID" = $1`;

            await client.query(query, [commentID]);

            return res.status(200).json({"message": "deleted"})
            
        } catch(e){
            console.log(e);
        } finally {
            client.release();
        }
    }

    async getComments(req: any, res: any){
        const client = await pool.connect();
        try {
            const productID = req.body.params.productID;

            var query = `SELECT * from "comments" WHERE "productID" = $1`;

            var { rows } = await client.query(query, [productID]);
            
            return res.status(200).json({"message": "got", "comments": rows})
        } catch(e){
            console.log(e);
        } finally {
            client.release();
        }
    }

    async averageRating(req: any, res:any){
        const client = await pool.connect();
        try {
            const productID = req.body.params.productID;

            var query = `SELECT AVG("rating") from "comments" WHERE "productID" = $1`;

            var { rows } = await client.query(query, [productID]);
            
            return res.status(200).json({"message": "got", "average": rows})
        } catch(e){
            console.log(e);
        } finally {
            client.release();
        }
    }
}
