import pool from '../util/postgresConfig';

class ListsController {
    public async addList(req: any, res: any){
        const listData = req.body.params;
        console.log(listData);
        
        const values = [listData.listName, listData.userID, listData.products]

        const query = `INSERT INTO lists ("listName", "listUser", "listProducts") VALUES ($1, $2, $3) RETURNING "listID"`;

        const client = await pool.connect();
        try {
            var { rows } = await client.query(query, values);

            return res.status(200).json({"message": "added", "listID": rows[0].listID})
        } catch(e){
            console.log(e);
        } finally {
            client.release()
        }
    }
}

export default ListsController;