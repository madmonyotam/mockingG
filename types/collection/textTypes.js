const faker = require('faker');
const translate = require("../../translate/getTranslate");


const textTypes = {

    word : {
        name: "Word",
        generate: ()=>{
            return faker.random.word();
        },
        group: 'text',
    },
    sentence : {
        name: "Sentence",
        renderer: {
            type: 'number',
            placeholder: translate('Enter amount of words')
          },
        generate: (element)=>{
            let {value} = element;
            let words = value ? value : null;
            return faker.lorem.sentence( words );
        },
        group: 'text',
    },
    textLines : {
        name: "Text Lines",
        renderer: {
            type: 'number',
            placeholder: translate('Enter number of lines')
        },
        generate: (element)=>{
            let {value} = element;
            let lines = value ? value : null;
            return faker.lorem.lines( lines );
        },
        group: 'text',
    },
    paragraph : {
        name: "Paragraph",
        scheme: {
            type: 'number',
            placeholder: translate('Enter number of sentences')
        },
        generate: (element)=>{
            let {value} = element;
            let sentences = value ? value : null;
            return faker.lorem.paragraph( sentences );
        },
        group: 'text',
    },

};

module.exports = textTypes;