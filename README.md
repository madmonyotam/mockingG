# GEN

### an advence tool for creating mock data for server and client.

#### Installation

- In command line or terminal run `npm i mocking_g`

- Mocking Gen will run on [localhost](http://localhost:5588/mocking_G) on port 5588;
- Then create your schemes with great ui.

## SERVER usage

```

const mg = require('mocking_g');

const scheme = {
    name: { type:'firstName' },
    age: { type:'number' }
}

const persons = mg.generate(scheme,100);
console.log(persons);

```

#### now set a path to your schemes and create some using gen

```

mg.schemes.setPath("C:/your/path/to/folder");

```

#### then generate easley from your schemes

```
const persons = mg.generate('test.person',100);
const phones = mg.generate(['test','phones'],100);
console.log({ persons, phones });

```

#### to get all types you can run

```
mg.types.getTypes();

```

#### to add types - basic

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

types.addTypes(newTypes);

```

more documentation will be added soon

## CLIENT usage

- use a standard get request

```
axios.get("http://localhost:5588/mocking_G/generate", { library:"examples", category:"person", amount:5 }).then((res)=>{
    console.log(res.data);
})

```

### or diractly from url

```
http://localhost:5588/mocking_G/generate?library=examples&category=person&amount=3

```

#### Version 2 is avaliable for you to check

- create schemes with a great ui program on port 5588
- see your schemes as well
- see all types, inclues yours, on the program
- edit item in scheme in the inspector.
- create data set and live api fest then ever before!

### coming soon

- docs and improvments 
- please leave notes for Gen to improve 

