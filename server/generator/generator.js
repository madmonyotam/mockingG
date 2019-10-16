const typesClass = require('../types/types');
const nameTypes = require('../types/nameTypes');

const types = new typesClass();
types.addTypes(nameTypes); 
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

const generate = (scheme, count = 10) => {
  if (!scheme) throw Error("scheme is required for generate");

  let mockList = [];
  for (let i = 0; i < count; i++) {
    mockList.push(modelator(scheme));
  }

  return mockList;
};

module.exports = { generate, types };
