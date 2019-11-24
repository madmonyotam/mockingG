# Mocking Gen

### an advence tool for creating mock data for server and client.

#### Installation

- In command line or terminal run `npm i mocking_g` or `npm install mocking_g`

- Mocking Gen will run on [localhost](http://localhost:5588/mocking_G) on port 5588;
- Then create your schemes with great ui.

## server usage

```

const mg = require('mocking_g');

const scheme = {
    name: { type:'firstName' },
    age: { type:'number' }
}

const persons = mg.generate(scheme,100);
console.log(persons);

```

### or

```
const mg = require('mocking_g');
const testScheme = mg.schemes.getScheme('test','person');

const persons = mg.generate(testScheme,100);
console.log(persons);

```

### or in short

```
const mg = require('mocking_g');

const persons = mg.generate('test.person',100);
const phones = mg.generate(['test','phones'],100);
console.log({ persons, phones });

```

### to see all types

```
mg.types.getTypes();

```

### to add types

```

const newTypes = {
    {
        randomNumber:{
            name: "Random Number",
            generate: (element)=>{
                return Math.random();
            },
            group: 'new group'
        }
    }
}

types.addTypes(nameTypes);

```

### coming soon

- create schemes with ui
- see your schemes on the ui
- see your new types on ui

- please check the library after 1.1.2020.
- thanks for your patience :)
