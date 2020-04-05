const faker = require('faker');
let counter = {};


const idTypes = {
    id : {
        name: "id",
        generate: (element)=>{
            return faker.random.uuid();
        },
        group: 'ids',
    },
    serialId : {
        name: "serial id",
        generate: (element, field)=>{
            if(!counter[field]) counter[field] = 0;
            setTimeout(() => {
                if(counter[field]) counter[field] = 0;
            }, 100)
            
            return counter[field]++;
        },
        group: 'ids',
    }
};

module.exports = idTypes;
