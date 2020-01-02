const faker = require("faker");
const translate = require("../../translate/getTranslate");

//TODO: add option to float/int  possitive/negative

const numberTypes = {
  number: {
    name: "number",
    generate: element => {
      return faker.random.number();
    },
    group: "number"
  },

  numberMax: {
    name: "number max",
    renderer: {
      max:{
        type: "number",
        placeholder: translate("enter max value for number")
      }
    },
    generate: element => {
      let { value } = element;
      if(!value) return translate("missing value");
      if(!value.max) return translate("missing property max");

      value = Number(value.max);
      if(isNaN(value)) return translate("value is not a number");
      return faker.random.number({ max: value });
    },
    group: "number"
  },

  numberMin: {
    name: "number min",
    renderer: {
      min:{
        type: "number",
        placeholder: translate("enter min value for number")
      }
    },
    generate: element => {
      let { value } = element;
      if(!value) return translate("missing value");
      if(!value.min) return translate("missing property min");

      value = Number(value.min);
      if(isNaN(value)) return translate("value is not a number");
      return faker.random.number({ min: value });
    },
    group: "number"
  },

  numberBetween: {
    name: "number Between",
    renderer: {
      min: {
        type: "number",
        placeholder: translate("enter min value for number")
      },
      max: {
        type: "number",
        placeholder: translate("enter max value for number")
      }
    },
    generate: element => {
      const { value } = element;
      if(!value) return translate("missing value");
      if(!value.min) return translate("missing property min");
      if(!value.max) return translate("missing property max");

      let min = Number(value.min);
      let max = Number(value.max);

      if(isNaN(min)) return translate("min value is not a number");
      if(isNaN(max)) return translate("max value is not a number");

      if (max <= min) max = min + 1;

      return Math.floor(Math.random() * (max - min)) + min;
    },
    group: "number"
  }
};

module.exports = numberTypes;
