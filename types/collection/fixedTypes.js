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
        generate: (el)=>{
            if(!el.value) return translate("missing value");
            if(!el.value["fixed value"]) return translate("missing fixed value");
            return el.value["fixed value"];
        },
        renderer: {
            "fixed value": {
                type: 'string',
                placeholder: translate('Enter fixed value') 
            }
        },
        group: 'fixed',
    },
    fixedNumber : {
        name: "Fixed Number",
        pure: true,
        generate: (el)=>{
            if(!el.value) return translate("missing value");
            if(!el.value["fixed number"]) return translate("missing fixed number");
            return Number(el.value["fixed number"]);
        },
        renderer: {
            "fixed number": {
                type: 'number',
                placeholder: translate('Enter fixed number') 
            }
        },
        group: 'fixed',
    }

};

module.exports = fixedTypes;