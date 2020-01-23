const _ = require("lodash");

const schemesClass = require("../schemes/schemes");
const typesClass = require("../types/types");

const nameTypes = require("../types/collection/nameTypes");
const fixedTypes = require("../types/collection/fixedTypes");
const webTypes = require("../types/collection/webTypes");
const numbersTypes = require("../types/collection/numbersTypes");
const textsTypes = require("../types/collection/textTypes");
const workTypes = require("../types/collection/workTypes");
const locatonTypes = require("../types/collection/locatonTypes");
const financeTypes = require("../types/collection/financeTypes");
const dateTypes = require("../types/collection/dateTypes");
const imageTypes = require("../types/collection/imageTypes");
const idTypes = require("../types/collection/idTypes");
const randomTypes = require("../types/collection/randomTypes");

const types = new typesClass();
const schemes = new schemesClass();

types.addTypes(nameTypes);
types.addTypes(fixedTypes);
types.addTypes(webTypes);
types.addTypes(numbersTypes);
types.addTypes(textsTypes);
types.addTypes(workTypes);
types.addTypes(locatonTypes);
types.addTypes(financeTypes);
types.addTypes(dateTypes);
types.addTypes(imageTypes);
types.addTypes(idTypes);
types.addTypes(randomTypes);

const setApp = app => {
  app.use("/mocking_G/generate", (req, res) => {
    const { query } = req;
    const { scheme, library, category, amount } = query;

    if (scheme) {
      try {
        res.send(generate(JSON.parse(scheme), amount));
      } catch (error) {
        res.status(400).json({
          message: "can't generate"
        });
      }

      return;
    }

    if (!library || !category) {
      res.status(400).json({
        message: `category ${category} does not exist`
      });
    }

    try {
      res.send(generate([library, category], amount));
    } catch (error) {
      res.status(400).json({
        message: "type does not exist in types"
      });
    }
  });
};

const generateOneItem = (func, el) => {
  let value = func(el);
  if (el.prefix) {
    value = el.prefix + value;
  }

  if (el.suffix) {
    value = value + el.suffix;
  }

  return value;
};

const getSize = (el) => {
  if(!el.randomSize) return el.size;
  const newSize = Math.floor( Math.random()*(Number(el.size)+1) );
  return newSize;
}

const generateFromType = el => {
  const allTypes = types.getTypes();

  if (!allTypes[el.type]) return `type ${el.type} does not exist in types`;
  const generateFunc = allTypes[el.type].generate;

  if (!_.isUndefined(el.size)) {
    let array = [];
    const finalSize = getSize(el);

    for (let i = 0; i < finalSize; i++) {
      array.push(generateOneItem(generateFunc, el));
    }
    return array;
  }

  return generateOneItem(generateFunc, el);
};

const modelator = scheme => {
  let newData = {};

  for (const field in scheme) {
    const el = scheme[field];
    newData[field] = generateFromType(el);
  }

  return newData;
};

const generate = (scheme, amount = 10) => {
  if (!scheme) return "can't find scheme";
  if (amount > 10000) amount = 10000;

  if (typeof scheme === "string") {
    scheme = scheme.split(/[.,]/);
  }

  if (Array.isArray(scheme)) {
    scheme = schemes.getScheme(scheme[0], scheme[1]);
  }

  let mockList = [];
  for (let i = 0; i < amount; i++) {
    mockList.push(modelator(scheme));
  }

  return mockList;
};

module.exports = { setApp, generate, types, schemes, generateFromType };
