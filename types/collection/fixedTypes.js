const translate = require('../../translate/getTranslate');

const fixedTypes = {

    false : {
        name:"False",
        generate: ()=>{
            return false;
        },
        group: 'fixed',
    },
    true : {
        name:"True",
        generate: ()=>{
            return true;
        },
        group: 'fixed',
    },
    nullValue : {
        name: "Null",
        generate: ()=>{
            return null;
        },
        group: 'fixed',
    },
    undefinedValue : {
        name: "Undefined",
        generate: ()=>{
            return undefined;
        },
        group: 'fixed',
    },
    emptyArray : {
        name: 'Empty Array',
        generate: ()=>{
            return [];
        },
        group: 'fixed',
    },
    emptyObject : {
        name: 'Empty Object',
        generate: ()=>{
            return {};
        },
        group: 'fixed',
    },
    fixedValue : {
        name: "Fixed Value",
        generate: (element)=>{
            return element.value;
        },
        renderer: {
            type: 'string',
            placeholder: translate('Enter fixed value') 
        },
        group: 'fixed',
    }

};

module.exports = fixedTypes;