export function returnServerError(res: any): any {
    return res.status(200).json({"message":"Server error!"});
}
//ACCOUNT TO TEST email: test123@test.com/Password123
//SHOP BANK ACCOUNT shopapp@bank.com/SHOPAPP123/2580
export var mainShopBill = "809155717864";
export var bankBackend = "http://localhost:8000";
export var bankPage = "http://localhost:3000";