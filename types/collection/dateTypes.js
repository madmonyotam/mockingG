const faker = require('faker');
const moment = require('moment');


const dateTypes = {
    month : {
        name: "month",
        generate: (el)=>{
            return faker.date.month();
        },
        group: 'date',
    },
    weekday : {
        name: "weekday",
        generate: (el)=>{
            return faker.date.weekday();
        },
        group: 'date',
    },
    futureDate : {
        name: "future date",
        renderer: {
            dateMask: {
                type: "string",
                placeholder: 'DD-MM-YYYY'
            }
        },
        generate: (el)=>{
            let dateformat = el.value && el.value.dateMask || null;
            return moment(faker.date.future( 50 )).format(dateformat);
        },
        group: 'date',
    },
    pastDate : {
        name: "past date",
        renderer: {
            dateMask: {
                type: "string",
                placeholder: 'DD-MM-YYYY'
            }
        },
        generate: (el)=>{
            let dateformat = el.value && el.value.dateMask || null;
            return moment(faker.date.past( 50 )).format(dateformat);
        },
        group: 'date',
    },
};

module.exports = dateTypes;
