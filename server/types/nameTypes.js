const faker = require('faker');

const nameTypes = {

    firstName : {
        info: "First name",
        renderer: {
            type: null
        },
        generate: (element)=>{
            return faker.name.firstName();
        },
        group: 'names',
    },

    fullName : {
        info: "First name and last name",
        renderer: {
            type: null
        },
        generate: (element)=>{
            return `${faker.name.firstName()} ${faker.name.lastName()}`;
        },
        group: 'names',
    },

    lastName : {
        info: "Last name",
        renderer: {
            type: null
        },
        generate: (element)=>{
            return faker.name.lastName();
        },
        group: 'names',
    }

};

module.exports = nameTypes;