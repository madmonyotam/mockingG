const faker = require('faker');
let counter = 0;


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
        generate: (element)=>{
            setTimeout(() => {
                if(counter) counter = 0;
            }, 100)
            
            return counter++;
        },
        group: 'ids',
    }
};

module.exports = idTypes;
