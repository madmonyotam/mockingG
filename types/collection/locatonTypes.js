const faker = require('faker');
const translate = require("../../translate/getTranslate");
const Wkt = require('wicket');
const turf = require('@turf/turf');

const locatonTypes = {
    country: {
        name: "country",
        generate: (element) => {
            return faker.address.country();
        },
        group: 'location',
    },
    city: {
        name: "city",
        generate: (element) => {
            return faker.address.city();
        },
        group: 'location',
    },
    zipCode: {
        name: "zip code",
        generate: (element) => {
            return faker.address.zipCode();
        },
        group: 'location',
    },
    streetName: {
        name: "street name",
        generate: (element) => {
            return faker.address.streetName();
        },
        group: 'location',
    },
    latitude: {
        name: "latitude",
        generate: (element) => {
            return faker.address.latitude();
        },
        group: 'location',
    },
    longitude: {
        name: "longitude",
        generate: (element) => {
            return faker.address.longitude();
        },
        group: 'location',
    },
    wkt: {
        name: "wkt",
        renderer: {
            wkt: {
                type: "string",
                placeholder: translate("enter a valid wkt")
            },
            amount: {
                type: "number",
                placeholder: translate("enter a valid amount")
            }
        },
        generate: (element) => {
            const { value } = element;

            if (!value) return translate("missing value");
            if (!value.wkt) return translate("missing property wkt");
            if (!value.amount) return translate("missing property amount");

            let poly;

            let wkt = new Wkt.Wkt();
            try {
                wkt.read(value.wkt);
                poly = turf.polygon(wkt.toJson().coordinates)
            } catch (e) {
                return translate("incorrect wkt format");
            }

            let amount;
            if (!isNaN(value.amount)) {
                amount = parseInt(value.amount);
                if (amount < 1) {
                    return translate("amount must be positive number");
                }
            }

            let points = [];

            try {
                let options = {
                    bbox: turf.bbox(wkt.toJson())
                };

                while (points.length != amount) {
                    let randomPoints = turf.randomPoint(amount - points.length, options);
                    randomPoints.features.forEach(element => {
                        if (element.geometry && element.geometry.type == "Point") {
                            const coordinate = element.geometry.coordinates;
                            if (turf.booleanPointInPolygon(coordinate, poly)) {
                                points.push(coordinate);
                            }
                        }
                    });
                }
            } catch (e) {
                console.error(e);
            }

            let formattedPoints = [];

            points.forEach(element => {
                let point = {};
                point['latitude'] = element[0];
                point['longitude'] = element[1];
                formattedPoints.push(point);
            });

            return formattedPoints;
        },
        group: 'location',
    },
};

module.exports = locatonTypes;

