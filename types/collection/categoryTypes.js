const translate = require("../../translate/getTranslate");
const faker = require("faker");

const categoryTypes = gen => {
  return {
    category: {
      name: "category",
      pure: true,
      renderer: {
        categoryPath: {
          type: "autocomplete",
          options: gen.schemes.getAllCategoriesPath(),
          placeholder: translate("choose category from list")
        },
        amount: {
          type: "number",
          placeholder: translate("enter amount")
        }
      },
      generate: el => {
        const { value } = el;
        if (!value) return translate("missing value");
        if (!value.categoryPath)
          return translate("missing property categoryPath");

        const [lib, cat] = el.value.categoryPath.split(".");
        const amount = el.value.amount;
        const scheme = gen.schemes.getScheme(lib, cat);
        if (typeof scheme === "undefined")
          return translate(`can't find scheme ${lib}.${cat}`);

        if (amount) {
          const newObject = gen.generate(scheme, amount);
          return newObject;
        }

        const newObject = gen.generate(scheme, 1);
        return newObject[0];
      },
      group: "categories"
    },

    categoryGroup: {
      name: "category Group",
      pure: true,
      renderer: {
        categories: {
          type: "autocompleteArray",
          options: gen.schemes.getAllCategoriesPath(),
          placeholder: translate("choose categories from list")
        },
        amount: {
          type: "number",
          placeholder: translate("enter amount")
        }
      },
      generate: el => {
        const { value } = el;
        if (!value) return translate("missing value");
        const { categories, amount } = value;

        if (!categories) return translate("missing property categories");
        if (!Array.isArray(categories))
          return translate("property categories expects Array");

        const genRandomScheme = () => {
          const length = categories.length;
          const index = Math.floor(Math.random() * length);
          const [lib, cat] = categories[index].split(".");
          const scheme = gen.schemes.getScheme(lib, cat);
          if (typeof scheme === "undefined")
            return translate(`can't find scheme ${lib}.${cat}`);
          const newObject = gen.generate(scheme, 1);
          return newObject[0];
        };

        if (amount) {
          const data = [];

          for (let i = 0; i < amount; i++) {
            const element = genRandomScheme();
            data.push(element);
          }

          return data;
        }

        return genRandomScheme();
      },

      group: "categories"
    },
    fromArray: {
      name: "element from array",
      pure: true,
      renderer: {
        dataSet: {
          type: "array",
          placeholder: translate("add values")
        }
      },
      generate: el => {
        const { value } = el;
        if (!value) return translate("missing value");

        return faker.random.arrayElement(value.dataSet);
      },
      group: "categories"
    }
  };
};

module.exports = categoryTypes;
