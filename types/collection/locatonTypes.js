const faker = require('faker');


const locatonTypes = {
    country : {
        name: "country",
        generate: (element)=>{
            return faker.address.country();
        },
        group: 'location',
    },
    city : {
        name: "city",
        generate: (element)=>{
            return faker.address.city();
        },
        group: 'location',
    },
    zipCode : {
        name: "zip code",
        generate: (element)=>{
            return faker.address.zipCode();
        },
        group: 'location',
    },
    streetName : {
        name: "street name",
        generate: (element)=>{
            return faker.address.streetName();
        },
        group: 'location',
    },
    latitude : {
        name: "latitude",
        generate: (element)=>{
            return faker.address.latitude();
        },
        group: 'location',
    },
    longitude : {
        name: "longitude",
        generate: (element)=>{
            return faker.address.longitude();
        },
        group: 'location',
    },
};

module.exports = locatonTypes;

