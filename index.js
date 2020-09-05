const A = require('arcsecond')

const lengthParser = A.sequenceOf([
  A.digit,
  A.digit,
]).map(v => v.join(''));

const idParser = A.sequenceOf([
  A.digit,
  A.digit,
]).map(v => v.join(''))

const valueParser = length => A.sequenceOf(
  Array.from({length: Number(length)}).map(() => A.anyChar)
).map(v => v.join(''))

const tlvParser = idParser.chain(id => {
  switch (id) {
    case '80':
      return A.coroutine(function* () {
        const length = yield A.sequenceOf([
          A.digit,
          A.digit,
          A.digit,
        ]).map(v => v.join(''));;

        const transactionInformations = yield valueParser(length)

        return {
          id,
          length,
          value: parser.run(transactionInformations)
        }
      })
    case '26': return A.coroutine(function* () {
      const length = yield lengthParser;

      const value = yield valueParser(length);

      return {id, length, value: parser.run(value)}
    })
    default:
      return A.coroutine(function* () {
        const length = yield lengthParser;

        const value = yield valueParser(length);

        return {id, length, value}
      })
  }
})

const parser = A.many(tlvParser)

const getIdValue = (id, tree) => {
  const field = tree.find(field => field.id === id)

  return field ? field.value : null
}

const treeToObject = tree => {
  const merchantAccountInformation = getIdValue("26", tree).result;
  const transactionInformations = getIdValue("80", tree).result;

  return {
    payloadFormatIndicator: getIdValue('00', tree),
    pointOfInitiationMethod: getIdValue("01", tree),
    merchantAccountInformation: {
      globallyUniqueIdentifier: getIdValue("00", merchantAccountInformation),
      merchantAccountInformation: getIdValue("01", merchantAccountInformation),
      logicNumber: getIdValue("02", merchantAccountInformation),
    },
    merchantCategory: getIdValue("52", tree),
    transactionCurrency: getIdValue("53", tree),
    transactionAmount: getIdValue("54", tree),
    countryCode: getIdValue("58", tree),
    merchantName: getIdValue("59", tree),
    merchantCity: getIdValue("60", tree),
    transactionInformations: {
      globallyUniqueIdentifier: getIdValue("00", transactionInformations),
      transactionId: getIdValue("01", transactionInformations),
      transactionDate: getIdValue("02", transactionInformations),
      mainProduct: getIdValue("03", transactionInformations),
      subProduct: getIdValue("04", transactionInformations),
      paymentInstallments: getIdValue("05", transactionInformations),
      transactionType: getIdValue("06", transactionInformations),
    },
    crc: getIdValue("63", tree),
  };
};

const parseAndFormat = emv => treeToObject(parser.run(emv).result)

module.exports.parser = parser
module.exports.treeToObject = treeToObject
module.exports.parseAndFormat = parseAndFormat
