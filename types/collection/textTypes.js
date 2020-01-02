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
            words:{
                type: 'number',
                placeholder: translate('Enter amount of words')
            }
          },
        generate: (element)=>{
            let {value} = element;

            let words = value && value.words ? value.words : null;
            return faker.lorem.sentence( words );
        },
        group: 'text',
    },
    textLines : {
        name: "Text Lines",
        renderer: {
            lines: {
                type: 'number',
                placeholder: translate('Enter number of lines')
            }
        },
        generate: (element)=>{
            let {value} = element;
            let lines = value && value.lines ? value.lines : null;
            return faker.lorem.lines( lines );
        },
        group: 'text',
    },
    paragraph : {
        name: "Paragraph",
        renderer: {
            sentences: {
                type: 'number',
                placeholder: translate('Enter number of sentences')
            }
        },
        generate: (element)=>{
            let {value} = element;
            let sentences = value && value.sentences ? value.sentences : null;
            return faker.lorem.paragraph( sentences );
        },
        group: 'text',
    },

};

module.exports = textTypes;