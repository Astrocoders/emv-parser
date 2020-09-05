const {treeToObject, parser} = require('./index')

const emv = `00020101021226410005Cielo0116123456789012000102082009130352040000530398654120000000001005802BR5905CIELO6014SANTO ANDRE SP801010033"https://www.cielo.com.br/qrcode"011613050329197F190A0212150518113349030410000404000105020006020163049872`
console.log(treeToObject(parser.run(emv).result))
