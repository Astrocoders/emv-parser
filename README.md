# emv-parser

npm install emv-parser

```js
const {parseWithTemplate} = require('emv-parser')
const templates = require('emv-parser/templates')

const emv = `00020101021226410005Cielo0116123456789012000102082009130352040000530398654120000000001005802BR5905CIELO6014SANTO ANDRE SP801010033"https://www.cielo.com.br/qrcode"011613050329197F190A0212150518113349030410000404000105020006020163049872`

console.log(parseWithTemplate(templates.cielo, emv))
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

Check out [index.test.js][./index.test.js] for more examples

# Templates
- Cielo
- PIX Static (EMV-MPM)
- PIX Dynamic (EMV-MPM)

# Limitations
We only parse the tree and we are not doing any fancy validations on it yet

# Specification followed

- [PIX](https://www.bcb.gov.br/content/estabilidadefinanceira/forumpireunioes/Anexo%20I%20-%20Padr%C3%B5es%20para%20Inicia%C3%A7%C3%A3o%20do%20PIX.pdf)
- [Cielo](https://developercielo.github.io/manual/qrcode)
