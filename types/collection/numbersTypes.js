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
    name: "number between",
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
  },

  formatNumber: {
    name: "format number",
    renderer: {
      format: {
        type: "string",
        placeholder: translate("enter format like ###-###-###")
      },
    },
    generate: element => {
      const { value } = element;
      if(!value) return translate("missing value");
      if(!value.format) return translate("missing format property");
      return faker.phone.phoneNumber(value.format);
    },
    group: "number"
  },

  rangedNumbers: {
    name: 'Ranged Numbers',
    renderer: {
        start: {
            type: "number",
            placeholder: translate("enter range start number")
        },
        end: {
            type: "number",
            placeholder: translate("enter range end number")
        }
    },
    generate: (element) => {
        const { value } = element;

        if (!value) return translate("missing value");
        if (!value.start) return translate("missing property start");
        if (!value.end) return translate("missing property end");

        let start = Number(value.start);
        let end = Number(value.end);

        if (start <= end) {
            return Array.from({ length: end - start + 1 }, (v, k) => start + k)
        } else {
            return Array.from({ length: start - end + 1 }, (v, k) => start - k)
        }
    },
    group: 'number'
  },
  
  float: {
    name: 'float',
    renderer: {
      min: {
        type: 'number',
        placeholder: 'enter min value for number'
      },
      max: {
        type: 'number',
        placeholder: 'enter max value for number'
      },
      decimal: {
        type: 'number',
        placeholder: 'after the dot'
      }
    },
    generate: (element) => {
      const { value } = element;

      if (!value) return 'missing value';
      if (!value.min) return 'missing property min';
      if (!value.max) return 'missing property max';

      const decimal = value.decimal ? Number(value.decimal) : 0;
      const min = Number(value.min);
      let max = Number(value.max);
  
      if (isNaN(min)) return 'min value is not a number';
      if (isNaN(max)) return 'max value is not a number';
      if (isNaN(decimal)) return 'decimal value is not a number';
  
      if (max <= min) max = min + 1;

      const val = (Math.random() * (max - min)) + min;
  
      return Number(val.toFixed(decimal));
    },
    group: 'number'
  },
};

module.exports = numberTypes;
