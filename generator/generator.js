const schemesClass = require('../schemes/schemes');
const typesClass = require('../types/types');

const nameTypes = require('../types/nameTypes');
const fixedTypes = require('../types/fixedTypes');
const webTypes = require('../types/webTypes');

const types = new typesClass();
const schemes = new schemesClass();

types.addTypes(nameTypes); 
types.addTypes(fixedTypes); 
types.addTypes(webTypes); 
const allTypes = types.getTypes(); 

const generateFromType = (el) => {
  if (!allTypes[el.type]) throw Error("type does not exist in types");
  return allTypes[el.type].generate(el);
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
  if (!scheme) throw Error("scheme is required for generate");
  if(amount>10000) amount = 10000;

  let mockList = [];
  for (let i = 0; i < amount; i++) {
    mockList.push(modelator(scheme));
  }

  return mockList;
};

module.exports = { generate, types, schemes };
