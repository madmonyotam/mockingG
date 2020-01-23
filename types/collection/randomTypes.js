const faker = require('faker');
const translate = require("../../translate/getTranslate");

const randomTypes = {
    boolean : {
        name: "boolean",
        generate: (element)=>{
            return faker.random.boolean();
        },
        group: 'random',
    },
    alphaNumeric : {
        name: "alphaNumeric",
        generate: (element)=>{
            const { value } = element;
            if(!value) return translate("missing value");
            if(!value.count) return translate("missing property count");

            return faker.random.alphaNumeric(Number(value.count));
        },
        renderer: {
            count: {
              type: "number",
              placeholder: translate("enter a length")
            }
          },
        group: 'random',
    }
};

module.exports = randomTypes;
