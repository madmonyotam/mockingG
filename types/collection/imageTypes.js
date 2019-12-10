const faker = require('faker');


const imageTypes = {
    image : {
        name: "image",
        generate: (element)=>{
            return faker.image.image();
        },
        group: 'images',
    },
    avatar : {
        name: "avatar",
        generate: (element)=>{
            return faker.image.avatar();
        },
        group: 'images',
    },
    abstract : {
        name: "abstract image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.abstract(width, height);
        },
        group: 'images',
    },
    animals : {
        name: "animals image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.animals(width, height);
        },
        group: 'images',
    },
    business : {
        name: "business image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.business(width, height);
        },
        group: 'images',
    },
    city : {
        name: "city image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.city(width, height);
        },
        group: 'images',
    },
    food : {
        name: "food image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.food(width, height);
        },
        group: 'images',
    },
    nightlife : {
        name: "nightlife image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.nightlife(width, height);
        },
        group: 'images',
    },
    fashion : {
        name: "fashion image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.fashion(width, height);
        },
        group: 'images',
    },
    people : {
        name: "people image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.people(width, height);
        },
        group: 'images',
    },
    nature : {
        name: "nature image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.nature(width, height);
        },
        group: 'images',
    },
    sports : {
        name: "sports image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.sports(width, height);
        },
        group: 'images',
    },
    technics : {
        name: "technics image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.technics(width, height);
        },
        group: 'images',
    },
    transport : {
        name: "transport image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.transport(width, height);
        },
        group: 'images',
    }
};

const getXY = () => {
    return {width: 640, height: 480}
}

module.exports = imageTypes;
