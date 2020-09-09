# qrcode-parser

npm install cielo-qrcode-parser

```js
const {applyCieloTemplate, parser} = require('./index')

const emv = `00020101021226410005Cielo0116123456789012000102082009130352040000530398654120000000001005802BR5905CIELO6014SANTO ANDRE SP801010033"https://www.cielo.com.br/qrcode"011613050329197F190A0212150518113349030410000404000105020006020163049872`

console.log(applyCieloTemplate(parser.run(emv).result))
// =>
{
  payloadFormatIndicator: '01',
  pointOfInitiationMethod: '12',
  merchantAccountInformation: {
    globallyUniqueIdentifier: 'Cielo',
    merchantAccountInformation: '1234567890120001',
    logicNumber: '20091303'
  },
  merchantCategory: '0000',
  transactionCurrency: '986',
  transactionAmount: '000000000100',
  countryCode: 'BR',
  merchantName: 'CIELO',
  merchantCity: 'SANTO ANDRE SP',
  transactionInformations: {
    globallyUniqueIdentifier: '"https://www.cielo.com.br/qrcode"',
    transactionId: '13050329197F190A',
    transactionDate: '150518113349',
    mainProduct: '1000',
    subProduct: '0001',
    paymentInstallments: '00',
    transactionType: '01'
  },
  crc: '9872'
}
```
