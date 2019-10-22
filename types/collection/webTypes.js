const faker = require('faker');

const webTypes = {

    userName : {
        name: "User name",
        generate: ()=>{
            return faker.internet.userName();
        },
        group: 'web',
    },
    url : {
        name: "URL address",
        generate: (element)=>{
            return faker.internet.url();
        },
        group: 'web',
    },
    ip : {
        name: "Ipv4 address",
        generate: (element)=>{
            return faker.internet.ip();
        },
        group: 'web',
    },
    ipv6 : {
        name: "Ipv6 address",
        generate: (element)=>{
            return faker.internet.ipv6();
        },
        group: 'web',
    },
    domain : {
        name: "Domain",
        generate: (element)=>{
            return faker.internet.domainName();
        },
        group: 'web',
    },
    email : {
        name:"Email",
        generate: (element)=>{
            return faker.internet.exampleEmail();
        },
        group: 'web',
    },
    userAgent : {
        name:"User agent",
        generate: (element)=>{
            return faker.internet.userAgent();
        },
        group: 'web',
    },
    protocol : {
        name:"Protocol",
        generate: (element)=>{
            return faker.internet.protocol();
        },
        group: 'web',
    },

};

module.exports = webTypes;