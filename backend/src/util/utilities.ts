export function returnServerError(res: any): any {
    return res.status(200).json({"message":"Server error!"});
}
//ACCOUNT TO TEST email: test123@test.com/Password1