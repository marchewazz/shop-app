//regular expression
const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export function isDataComplete(data: any) : boolean{
    console.log(data);
    for (var key in data){
        if (data[key] === "" || data[key] === null) return false
    }
    return true
}

export function testEmailRegExp(email: string) : boolean{
    return emailRegExp.test(email);
}
export function testPasswordRegExp(password: string) : boolean{
    return passwordRegExp.test(password)
}
export function arePasswordsSame(password: string, repeatedPassword: string) : boolean{
    return true ? password === repeatedPassword : false;
}

export function returnRandomProductsMenu(): number {
    const productsMenu = [
        0, //MENU WITH MOST POPULAR PRODUCTS
        1, //MENU WITH RANDOM PRODUCTS
    ]
    return productsMenu[Math.floor(Math.random() * productsMenu.length)];
}



export var pageUrl = `http://localhost:4200`;
//backend url
export var backendUrl = `http://localhost:5000/api`;
//bank backend url
export var bankPageUrl = "http://localhost:3000";
export var mainShopBill = "215889453176";
export var bankAuthPage = "http://localhost:4200/confirmedauth";
//shop currency
export var shopCurrency = "$";