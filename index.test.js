const {parseWithTemplate} = require('./index')
const templates = require('./templates')

const cieloQr = `00020101021226410005Cielo0116123456789012000102082009130352040000530398654120000000001005802BR5905CIELO6014SANTO ANDRE SP801010033"https://www.cielo.com.br/qrcode"011613050329197F190A0212150518113349030410000404000105020006020163049872`
const brCodeQr = `00020126440014BR.GOV.BCB.PIX0122FULANO2019 EXAMPLE.COM5204000053039865802BR5913FULANO DE TAL6008BRASILIA62410503***50300017BR.GOV.BCB.BRCODE01051.0.0630427E9`;
const pixDynamic = `00020101021226740014br.gov.bcb.pix210812345678220412342308123456782420001122334455667788995204000053039865406123.455802BR5913FULANO DE TAL6008BRASILIA62190515RP12345678-201980720014br.gov.bcb.pix2550bx.com.br/spi/U0VHUkVET1RPVEFMTUVOVEVBTEVBVE9SSU8=630434D1`
console.log('cielo', parseWithTemplate(templates.cielo, cieloQr))
console.log('pixStatic', parseWithTemplate(templates.pixStatic, brCodeQr))
console.log('pixDynamic', parseWithTemplate(templates.pixDynamic, pixDynamic))
