const faker = require('faker');


const imageTypes = {
    image : {
        name: "image",
        generate: (element)=>{
            return faker.image.image();
        },
        group: 'images',
        pure: true
    },
    avatar : {
        name: "avatar",
        generate: (element)=>{
            return faker.image.avatar();
        },
        group: 'images',
        pure: true
    },
    abstract : {
        name: "abstract image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.abstract(width, height);
        },
        group: 'images',
        pure: true
    },
    animals : {
        name: "animals image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.animals(width, height);
        },
        group: 'images',
        pure: true
    },
    business : {
        name: "business image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.business(width, height);
        },
        group: 'images',
        pure: true
    },
    city : {
        name: "city image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.city(width, height);
        },
        group: 'images',
        pure: true
    },
    food : {
        name: "food image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.food(width, height);
        },
        group: 'images',
        pure: true
    },
    nightlife : {
        name: "nightlife image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.nightlife(width, height);
        },
        group: 'images',
        pure: true
    },
    fashion : {
        name: "fashion image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.fashion(width, height);
        },
        group: 'images',
        pure: true
    },
    people : {
        name: "people image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.people(width, height);
        },
        group: 'images',
        pure: true
    },
    nature : {
        name: "nature image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.nature(width, height);
        },
        group: 'images',
        pure: true
    },
    sports : {
        name: "sports image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.sports(width, height);
        },
        group: 'images',
        pure: true
    },
    technics : {
        name: "technics image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.technics(width, height);
        },
        group: 'images',
        pure: true
    },
    transport : {
        name: "transport image",
        generate: (element)=>{
            const { width, height } = getXY();
            return faker.image.transport(width, height);
        },
        group: 'images',
        pure: true
    }
};

const getXY = () => {
    return {width: 640, height: 480}
}

module.exports = imageTypes;
