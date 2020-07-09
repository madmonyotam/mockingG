const translate = require("../../translate/getTranslate");
const faker = require("faker");
const counter = {};
const catCounter = {};

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
          const newObject = gen.generate([lib, cat], amount);
          return newObject;
        }

        const newObject = gen.generate([lib, cat], 1);
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
          const newObject = gen.generate([lib, cat], 1);
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

    categoryGroupOrder: {
      name: "categories By Order",
      pure: true,
      renderer: {
        categories: {
          type: "autocompleteArray",
          options: "getAllCategoriesPath",
          placeholder: translate("choose categories from list")
        }
      },
      generate: (el, field)  => {
        const { value } = el;
        if (!value) return translate("missing value");

        const { categories } = value;

        if (!categories) return translate("missing property categories");
        if (!Array.isArray(categories))
          return translate("property categories expects Array");

        const genSchema = () => {
          let index = catCounter[field];

          if(typeof categories[index] === 'undefined'){
            catCounter[field] = 0;
            index = 0;
          }

          const [lib, cat] = categories[index].split(".");
          const schema = gen.schemas.getSchema(lib, cat);
          if (typeof schema === "undefined")
            return translate(`can't find schema ${lib}.${cat}`);

          const newObject = gen.generate([lib, cat], 1);
          return newObject[0];
        };

        if (!catCounter[field]) catCounter[field] = 0;
        const schema = genSchema();
        catCounter[field]++;

        setTimeout(() => {
          catCounter[field] = 0;
        }, 100);

        return schema;
      },

      group: "categories"
    },
    
    fromArray: {
      name: "element from array",
      pure: true,
      renderer: {
        dataSet: {
          type: "array",
          placeholder: translate("add values separated by commas")
        }
      },
      generate: el => {
        const { value } = el;
        if (!value) return translate("missing value");

        return faker.random.arrayElement(value.dataSet);
      },
      group: "categories"
    },

    fromArraySerial: {
      name: 'from array order',
      pure: true,
      renderer: {
        dataSet: {
          type: 'array',
          placeholder: 'add values'
        }
      },
      generate: (el, field) => {
        const { value } = el;
  
        if (!value) return 'missing value';
        if (!counter[field]) counter[field] = 0;
  
        setTimeout(() => {
          counter[field] = 0;
        }, 100);
  
        const val = value.dataSet[counter[field]];
  
        counter[field]++;

        if(counter[field] === value.dataSet.length) counter[field] = 0;
        
        return val;
      },
      group: 'categories'
    }
  };
};

module.exports = categoryTypes;
