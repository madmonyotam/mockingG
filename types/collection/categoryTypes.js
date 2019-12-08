const translate = require("../../translate/getTranslate");

const categoryTypes = gen => {
  return {
    category: {
      name: "category",
      renderer: {
          categoryPath:{
              type: "autocomplete",
              options: gen.schemes.getAllCategoriesPath(),
              placeholder: translate("choose category from list")
          },
          size: {
            type: "nubmer",
            placeholder: translate("enter amount")
          }
      },
      generate: el => {
        const [lib, cat] = el.value.categoryPath.split(".");
        const size = el.value.size;
        const scheme = gen.schemes.getScheme(lib, cat);

        if(size){
            const newObject = gen.generate(scheme,size);
            return newObject;
        }

        const newObject = gen.generate(scheme,1);
        return newObject[0];
      },
      group: "categories"
    }
  };
};

module.exports = categoryTypes;
