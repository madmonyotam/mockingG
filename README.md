# GEN

## Intro

### In Short
<b>An advanced tool for creating mocked data for server and client.</b>

### In Several More Words

A very powerful and flexible framework that allows defining and generating mocked data easily and quickly. The framework is a generic one, and can be extended programmatically with new types. It is used by firstly creating a schema for our data, and then generating as many instances from that schema as needed.

## Installation

        npm i mocking_g

## Usage

- Just include the library in your project:

        const gen = require('mocking_g');

- Mocking GEN UI will run on [localhost](http://localhost:5588/mocking_G) on port 5588

- Generate your data like so:
```
const library = 'examples';
const schema = 'person';
const persons = gen.generate([library,schema], 10);
```
Or just
```
const persons = gen.generate('examples.person', 10);
```

## Terminology

* <b>Library</b> - a logical layer for separation of schemas.
* <b>Schema</b> - a JSON schema that describes our data. We can create schemas using the UI or programmatically as shown below.
* <b>Type</b> - Schemas are consisted from types. There are built-in types in the library, but we can define new types as shown below as well.

## Examples

An example for a <b>person</b> schema can be something like that: 

```
{
  "uuid": {
    "type": "id"
  },
  "firstName": {
    "type": "firstName"
  },
  "lastName": {
    "type": "lastName"
  },
  "birthDate": {
    "type": "pastDate",
    "value": {
      "dateMask": "DD-MM-YYYY",
      "years": 50
    }
  },
  "country": {
    "type": "country"
  },
  "streetName": {
    "type": "streetName"
  },
  "zipCode": {
    "type": "zipCode"
  },
  "email": {
    "type": "email"
  },
  "company": {
    "type": "company"
  },
  "jobTitle": {
    "type": "jobTitle"
  }
}
```

While the generated data can be something like this: 

```
{
    "uuid": "7f30a631-12c9-42a1-ad2d-a641b85a5647",
    "firstName": "Scot",
    "lastName": "Goodwin",
    "birthDate": "11-01-2008",
    "country": "Palau",
    "streetName": "O'Connell River",
    "zipCode": "66932-6018",
    "email": "Marlon.Marquardt@example.org",
    "company": "Altenwerth, Waelchi and Ledner",
    "jobTitle": "Lead Markets Analyst"
  }
```

## Features

* <b>Generate</b><br>

It is possible to generate data from a schema created programmatically:
```
const schema = {
    name: { type: 'firstName' },
    age: { type: 'number' }
}

const generated = gen.generate(schema, 10);
```
Or use the intuitive GEN UI and create schemas effortlessly.<br>
Then, just reference the schema and generate your data:
```
gen.generate('examples.person', 10);
```
You can set the path on which GEN will save your schemas.
In addition, GEN will use this path to load the schemas on startup.
```
gen.schemas.setPath('C:/your/path/to/folder');

```

* <b>Types</b><br>

Get existing types by:
```
gen.types.getTypes()
```
Or
```
gen.types.getTypesArrangeByGroups() // types belong in a "group"
```
You can also create your own types programmatically:
```
const myRandomNumberType = {
    {
        randomNumber:{
            name: 'Random Number',
            generate: (element)=>{
                return Math.random();
            },
            group: 'new group'
        }
    }
}

types.addTypes(myRandomNumberType);
```

* <b>Libraries</b><br>

As explained earlier, libraries are just logical layers that can contain your schemas. GEN supports various CRUD operations on libraries, few of them are: 

```
gen.schemas.getAllLibraries();
gen.schemas.removeLibrary(libraryName);
gen.schemas.addLibrary(libraryName);
```

## CLIENT usage

- Use a standard get request

```
axios.get('http://localhost:5588/mocking_G/generate', { library: 'examples', category: 'person', amount: 5 }).then((res)=>{
    console.log(res.data);
})

```

Or directly from a url

```
http://localhost:5588/mocking_G/generate?library=examples&category=person&amount=3
```

#### Coming soon

- Docs and improvements 
