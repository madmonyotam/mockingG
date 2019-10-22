const faker = require('faker');

const nameTypes = {

    firstName : {
        name: "First Name",
        generate: (element)=>{
            return faker.name.firstName();
        },
        group: 'names',
    },

    fullName : {
        name: "Full Name",
        generate: (element)=>{
            return `${faker.name.firstName()} ${faker.name.lastName()}`;
        },
        group: 'names',
    },

    lastName : {
        name: "Last Name",
        generate: (element)=>{
            return faker.name.lastName();
        },
        group: 'names',
    }

};

module.exports = nameTypes;