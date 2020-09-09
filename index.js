const A = require('arcsecond')

const lengthParser = A.sequenceOf([
  A.digit,
  A.digit,
]).map(v => v.join(''));

const idParser = A.sequenceOf([
  A.digit,
  A.digit,
]).map(v => v.join(''))

const times = (n, fn) => Array.from({length: Number(n)}).map(fn)

const valueParser = length => A.sequenceOf(
  times(length, () => A.anyChar),
).map(v => v.join(''))

// make this better?
const tlvParser = (config) => idParser.chain(id => {
  switch (id) {
    case '80':
      return A.coroutine(function* () {
        const length = yield A.sequenceOf(
          times(config.unreservedLength, () => A.digit)
        ).map(v => v.join(''));

        const transactionInformations = yield valueParser(length)

        return {
          id,
          length,
          value: parser(config).run(transactionInformations)
        }
      })
    case '26': return A.coroutine(function* () {
      const length = yield lengthParser;

      const value = yield valueParser(length);

      return {id, length, value: parser(config).run(value)}
    })
    default:
      return A.coroutine(function* () {
        const length = yield lengthParser;

        const value = yield valueParser(length);

        return {id, length, value}
      })
  }
})

const parser = (config) => A.many(tlvParser(config))

const parseWithTemplate = (template, emv) => template(parser, emv)

module.exports.parser = parser
module.exports.parseWithTemplate = parseWithTemplate
