import pool from '../util/postgresConfig';
import { returnServerError } from '../util/utilities';

export default class CommentsController{
    async addComment(req: any, res: any){
        try {
            const client = await pool.connect();
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
        }
    }

    async deleteComment(req: any, res: any){
        try {
            const client = await pool.connect();
            const commentID = req.body.params.commentID;
            console.log(commentID);

            const query = `DELETE FROM "comments" WHERE "commentID" = $1`;

            await client.query(query, [commentID]);

            return res.status(200).json({"message": "deleted"})
            
        } catch(e){
            console.log(e);
        }
    }

    async getComments(req: any, res: any){
        try {
            const client = await pool.connect();
            const productID = req.body.params.productID;

            var query = `SELECT * from "comments" WHERE "productID" = $1`;

            var { rows } = await client.query(query, [productID]);
            
            return res.status(200).json({"message": "got", "comments": rows})
        } catch(e){
            console.log(e);
        }
    }

    async averageRating(req: any, res:any){
        try {
            const client = await pool.connect();
            const productID = req.body.params.productID;

            var query = `SELECT AVG("rating") from "comments" WHERE "productID" = $1`;

            var { rows } = await client.query(query, [productID]);
            
            return res.status(200).json({"message": "got", "average": rows})
        } catch(e){
            console.log(e);
        }
    }
}
