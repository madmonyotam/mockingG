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
          options: "getAllCategoriesPath",
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
        const schema = gen.schemas.getSchema(lib, cat);
        if (typeof schema === "undefined")
          return translate(`can't find schema ${lib}.${cat}`);

        if (amount) {
          const newObject = gen.generate(schema, amount);
          return newObject;
        }

        const newObject = gen.generate(schema, 1);
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
          options: "getAllCategoriesPath",
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

        const genRandomSchema = () => {
          const length = categories.length;
          const index = Math.floor(Math.random() * length);
          const [lib, cat] = categories[index].split(".");
          const schema = gen.schemas.getSchema(lib, cat);
          if (typeof schema === "undefined")
            return translate(`can't find schema ${lib}.${cat}`);
          const newObject = gen.generate(schema, 1);
          return newObject[0];
        };

        if (amount) {
          const data = [];

          for (let i = 0; i < amount; i++) {
            const element = genRandomSchema();
            data.push(element);
          }

          return data;
        }

        return genRandomSchema();
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
