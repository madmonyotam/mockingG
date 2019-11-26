const schemesClass = require('../schemes/schemes');
const typesClass = require('../types/types');

const nameTypes = require('../types/collection/nameTypes');
const fixedTypes = require('../types/collection/fixedTypes');
const webTypes = require('../types/collection/webTypes');
const numbersTypes = require('../types/collection/numbersTypes');

const types = new typesClass();
const schemes = new schemesClass();

types.addTypes(nameTypes); 
types.addTypes(fixedTypes); 
types.addTypes(webTypes); 
types.addTypes(numbersTypes); 

const allTypes = types.getTypes(); 

const setApp = (app) => {

  app.use("/mocking_G/generate", (req, res) => {
    const { query } = req;
    const { scheme, library, category, amount } = query;

    if(scheme){
      try {
        res.send(generate(JSON.parse(scheme),amount));
       } catch (error) {
         res.status(400)
         .json({
           message: "can't generate"
         });
       }

       return;
    }

    if (!library || !category) {
      res.status(400)
      .json({
        message: `category ${category} does not exist`
    });
    }

    try {
      
     res.send(generate([library, category],amount));
    } catch (error) {
      res.status(400)
      .json({
        message: 'type does not exist in types'
      });
    }
    
  });
};

const generateFromType = (el) => {
  if (!allTypes[el.type]) throw Error("type does not exist in types");
  const generateFunc = allTypes[el.type].generate;

  if(el.size){
    let array = [];
    for (let i = 0; i < el.size; i++) {
      array.push(generateFunc(el));    
    }
    return array;
  }

  return generateFunc(el);
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

  if (typeof scheme === 'string') {
    scheme = scheme.split(/[.,]/);
  }

  if(Array.isArray(scheme)){
    scheme = schemes.getScheme(scheme[0],scheme[1]);
  }

  let mockList = [];
  for (let i = 0; i < amount; i++) {
    mockList.push(modelator(scheme));
  }

  return mockList;
};

module.exports = { setApp, generate, types, schemes };
