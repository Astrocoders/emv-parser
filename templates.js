const getIdValue = (id, tree) => {
  if(!tree) return null

  const field = tree.find(field => field.id === id)

  return field ? field.value : null
}


module.exports.cielo = (parser, emv) => {
  const config = {
    unreservedLength: 3,
  }
  const tree = parser(config).run(emv).result
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

module.exports.pixStatic = (parser, emv) => {
  const config = {
    unreservedLength: 2,
  }
  const tree = parser(config).run(emv).result
  const merchantAccountInformation = getIdValue("26", tree).result;
  const additionalData = getIdValue("62", tree).result;

  return {
    payloadFormatIndicator: getIdValue('00', tree),
    pointOfInitiationMethod: getIdValue("01", tree),
    merchantAccountInformation: {
      globallyUniqueIdentifier: getIdValue("00", merchantAccountInformation),
      pixKey: getIdValue("01", merchantAccountInformation),
    },
    merchantCategory: getIdValue("52", tree),
    transactionCurrency: getIdValue("53", tree),
    transactionAmount: getIdValue("54", tree),
    countryCode: getIdValue("58", tree),
    merchantName: getIdValue("59", tree),
    merchantCity: getIdValue("60", tree),
    additionalData: {
      referenceLabel: getIdValue("05", additionalData),
    },
    crc: getIdValue("63", tree),
  };
};

module.exports.pixDynamic = (parser, emv) => {
  const config = {
    unreservedLength: 2,
  }

  const tree = parser(config).run(emv).result
  const merchantAccountInformation = getIdValue("26", tree).result;
  const additionalData = getIdValue("62", tree).result;
  const unreserved = (getIdValue("80", tree) || {result: []}).result;

  return {
    payloadFormatIndicator: getIdValue('00', tree),
    pointOfInitiationMethod: getIdValue("01", tree),
    merchantAccountInformation: {
      globallyUniqueIdentifier: getIdValue("00", merchantAccountInformation),
      institution: getIdValue("21", merchantAccountInformation),
      accountType: getIdValue("22", merchantAccountInformation),
      branch: getIdValue("23", merchantAccountInformation),
      account: getIdValue("24", merchantAccountInformation),
    },
    merchantCategory: getIdValue("52", tree),
    transactionCurrency: getIdValue("53", tree),
    transactionAmount: getIdValue("54", tree),
    countryCode: getIdValue("58", tree),
    merchantName: getIdValue("59", tree),
    merchantCity: getIdValue("60", tree),
    additionalData: {
      referenceLabel: getIdValue("05", additionalData),
    },
    unreserved: {
      gui: getIdValue("00", unreserved),
      url: getIdValue("25", unreserved)
    },
    crc: getIdValue("63", tree),
  };
};
