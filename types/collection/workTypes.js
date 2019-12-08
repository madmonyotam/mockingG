const faker = require('faker');


const workTypes = {
    company : {
        name: "company name",
        generate: (element)=>{
            return faker.company.companyName();
        },
        group: 'work',
    },
    jobTitle : {
        name: "job title",
        generate: (element)=>{
            return faker.name.jobTitle();
        },
        group: 'work',
    }
};

module.exports = workTypes;
