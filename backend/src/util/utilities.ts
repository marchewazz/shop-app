export function returnServerError(res: any): any {
    return res.status(200).json({"message":"Server error!"});
}
//ACCOUNT TO TEST email: test123@test.com/Password1
//ACCOUNT TO TEST email: email135@email.com/TomSmith1
//SHOP BANK ACCOUNT shopapp@bank.com/SHOPAPP123/2580
export var mainShopBill = "723048019603"
export var bankBackend = "http://localhost:8000";