const faker = require('faker');


const financeTypes = {
    account : {
        name: "account",
        generate: (element)=>{
            return faker.finance.account();
        },
        group: 'finance',
    },
    accountName : {
        name: "account name",
        generate: (element)=>{
            return faker.finance.accountName();
        },
        group: 'finance',
    },
    currencyCode : {
        name: "currency code",
        generate: (element)=>{
            return faker.finance.currencyCode();
        },
        group: 'finance',
    },
    currencyName : {
        name: "currency name",
        generate: (element)=>{
            return faker.finance.currencyName();
        },
        group: 'finance',
    },
    currencySymbol : {
        name: "currency symbol",
        generate: (element)=>{
            return faker.finance.currencySymbol();
        },
        group: 'finance',
    },
};

module.exports = financeTypes;
