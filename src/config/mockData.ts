import { getStorage, HISTORY_ROUTE_KEY } from "@/scripts"


const MOCK_USER_INFO = {
  authority: "admin",
  userId: "afEbE4d9-aDDd-eCF6-2D1F-FDDCcF1430DC",
  userName: "admin"
}

export default function (url) {
  return {
    'users/verifyIsLogin': getStorage(HISTORY_ROUTE_KEY) ? MOCK_USER_INFO : {},

    'users/login/account': MOCK_USER_INFO,

    'users/logout/account': {},

    'ranking/sales/0': { "data": [{ "id": "CcAd7FD5-d217-86c7-bFEb-A492ddE6D2bb", "ranking": "Top1", "price": 101.23, "quantity": 560, "goodsName": "新款玻璃杯", "sales": "56688.80" }, { "id": "B2CD9C81-88C1-Dbcb-D606-ccd93eF17249", "ranking": "Top2", "price": 87.18, "quantity": 904, "goodsName": "新款小米", "sales": "78810.72" }, { "id": "b6Edd3bd-4FEF-05B4-EBBb-B218BEB4BFFc", "ranking": "Top3", "price": 120.63, "quantity": 963, "goodsName": "新款巧克力", "sales": "116166.69" }, { "id": "d61ACF33-f2C5-759D-e17d-dECe8fE705e9", "ranking": "Top4", "price": 61.45, "quantity": 330, "goodsName": "新款油", "sales": "20278.50" }, { "id": "3BFD7DAD-fb97-2d65-eEf9-9C7DeB27a12c", "ranking": "Top5", "price": 181.98, "quantity": 126, "goodsName": "新款奶粉", "sales": "22929.48" }, { "id": "FC17FfF2-5975-ba2C-Fc7a-4e14A7ABe46B", "ranking": "Top6", "price": 62.52, "quantity": 492, "goodsName": "新款奶粉", "sales": "30759.84" }, { "id": "Df4BC403-A485-6Af3-9b14-6bD64DA3B5d7", "ranking": "Top7", "price": 95.19, "quantity": 396, "goodsName": "新款vivo", "sales": "37695.24" }, { "id": "0b6eFE33-cBFB-10fF-8cbf-50eeDaEaE41e", "ranking": "Top8", "price": 106.42, "quantity": 859, "goodsName": "新款vivo", "sales": "91414.78" }, { "id": "bADb9e0E-AbD1-0D97-eE96-46228dD5B5Be", "ranking": "Top9", "price": 162.73, "quantity": 457, "goodsName": "新款apple", "sales": "74367.61" }, { "id": "A2C4fA36-3b1A-cE9B-cA1D-4D8F08bEE3b9", "ranking": "Top10", "price": 42.75, "quantity": 918, "goodsName": "新款巧克力", "sales": "39244.50" }], "totalCount": 11, "pageTotal": 2, "pageSize": 10, "pageIndex": 1, "hasPrevPage": false, "hasNextPage": true, "type": "0" }
  }[url] || {}
}
