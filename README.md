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

const pixStatic = `00020126440014BR.GOV.BCB.PIX0122FULANO2019 EXAMPLE.COM5204000053039865802BR5913FULANO DE TAL6008BRASILIA62410503***50300017BR.GOV.BCB.BRCODE01051.0.0630427E9`;

console.log(parseWithTemplate(templates.pixStatic, pixStatic))
// =>
{
  payloadFormatIndicator: '01',
  pointOfInitiationMethod: null,
  merchantAccountInformation: {
    globallyUniqueIdentifier: 'BR.GOV.BCB.PIX',
    pixKey: 'FULANO2019 EXAMPLE.COM'
  },
  merchantCategory: '0000',
  transactionCurrency: '986',
  transactionAmount: null,
  countryCode: 'BR',
  merchantName: 'FULANO DE TAL',
  merchantCity: 'BRASILIA',
  additionalData: { referenceLabel: null },
  crc: '27E9'
}


```

Check out [index.test.js](./index.test.js) for more examples

# Templates
- Cielo
- PIX Static (EMV-MPM)
- PIX Dynamic (EMV-MPM)

# Limitations
We only parse the tree and we are not doing any fancy validations on it yet

# Specification followed

- [PIX](https://www.bcb.gov.br/content/estabilidadefinanceira/forumpireunioes/Anexo%20I%20-%20Padr%C3%B5es%20para%20Inicia%C3%A7%C3%A3o%20do%20PIX.pdf)
- [Cielo](https://developercielo.github.io/manual/qrcode)
