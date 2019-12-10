const faker = require("faker");
const moment = require("moment");
const translate = require("../../translate/getTranslate");

const dateTypes = {
  month: {
    name: "month",
    generate: el => {
      return faker.date.month();
    },
    group: "date"
  },
  weekday: {
    name: "weekday",
    generate: el => {
      return faker.date.weekday();
    },
    group: "date"
  },
  recentDate: {
    name: "recent date",
    renderer: {
      dateMask: {
        type: "string",
        placeholder: "DD-MM-YYYY"
      },
      days: {
        type: "number",
        placeholder: "last X days"
      }
    },
    generate: el => {
      const { value } = el;
      if (!value) return translate("missing value");
      let dateformat = value.dateMask || null;

      if (!value.days) return translate("missing days property");
      const days = Number(value.days);

      if (isNaN(days)) return translate("days value is not a number");
      return moment(faker.date.recent(days)).format(dateformat);
    },
    group: "date"
  },
  futureDate: {
    name: "future date",
    renderer: {
      dateMask: {
        type: "string",
        placeholder: "DD-MM-YYYY"
      },
      years: {
        type: "number",
        placeholder: "last X years"
      }
    },
    generate: el => {
      const { value } = el;
      if (!value) return translate("missing value");
      let dateformat = el.value.dateMask || null;

      if (!value.years) return translate("missing years property");
      const years = Number(value.years);

      if (isNaN(years)) return translate("years value is not a number");
      return moment(faker.date.future(years)).format(dateformat);
    },
    group: "date"
  },
  pastDate: {
    name: "past date",
    renderer: {
      dateMask: {
        type: "string",
        placeholder: "DD-MM-YYYY"
      },
      years: {
        type: "number",
        placeholder: "last X years"
      }
    },
    generate: el => {
      const { value } = el;
      if (!value) return translate("missing value");
      let dateformat = (el.value && el.value.dateMask) || null;

      if (!value.years) return translate("missing years property");
      const years = Number(value.years);

      if (isNaN(years)) return translate("years value is not a number");
      return moment(faker.date.past(years)).format(dateformat);
    },
    group: "date"
  }
};

module.exports = dateTypes;
