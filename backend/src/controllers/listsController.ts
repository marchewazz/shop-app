import pool from '../util/postgresConfig';

class ListsController {
    public async addList(req: any, res: any){
        const listData = req.body.params;
        console.log(listData);
        
        const values = [listData.listName, listData.userID, listData.products]

        const query = `INSERT INTO lists ("listName", "listUser", "listProducts", "listCreateDate") VALUES ($1, $2, $3, LOCALTIMESTAMP) RETURNING "listID"`;

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

    public async getOneList(req: any, res: any){
        const listData = req.body.params;
        var userFirstName = '';
        console.log(listData);
        

        var query = `SELECT * FROM lists WHERE "listID" = $1`;

        const client = await pool.connect();
        try {
            var { rows } = await client.query(query, [listData.listID]);
            const list = rows[0];
            if (list.listUser){
                query = `SELECT "userFirstName" FROM users WHERE "userID" = $1`
                var { rows } = await client.query(query, [list.listUser]);
                userFirstName = rows[0].userFirstName;
            }
            return res.status(200).json({"list": list, "userFirstName": userFirstName})
        } catch(e){
            console.log(e);
        } finally {
            client.release()
        }
    }
}

export default ListsController;