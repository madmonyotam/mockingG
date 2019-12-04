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
      type: "number",
      placeholder: translate("enter max value for number")
    },
    generate: element => {
      let { value } = element;
      value = Number(value);
      return faker.random.number({ max: value });
    },
    group: "number"
  },

  numberMin: {
    name: "number min",
    renderer: {
      type: "number",
      placeholder: translate("enter min value for number")
    },
    generate: element => {
      let { value } = element;
      value = Number(value);
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

      let min = Number(value.min);
      let max = Number(value.max);

      if (max <= min) max = min + 1;

      return Math.floor(Math.random() * (max - min)) + min;
    },
    group: "number"
  }
};

module.exports = numberTypes;
