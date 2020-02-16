const gen = require("./generator");

describe("generate function", () => {
  it("should generate 10 items", () => {
    const schema = {
      name: { type: "firstName" }
    };

    const data = gen.generate(schema);

    expect(data.length).toEqual(10);
  });

  it("should generate 100 items", () => {
    const schema = {
      name: { type: "firstName" }
    };

    const data = gen.generate(schema, 100);

    expect(data.length).toEqual(100);
  });

  it("should generate 10000 items as max", () => {
    const schema = {
      name: { type: "firstName" }
    };

    const data = gen.generate(schema, 10005);

    expect(data.length).toEqual(10000);
  });

  it("should generate by schema", () => {
    gen.schemas.addSchema("myFirst", "test", {
      name: { type: "firstName" },
      gender: { type: "fixedValue", value: "male" }
    });

    const schemas = gen.schemas.getSchema("myFirst", "test");
    const data = gen.generate(schemas, 30);

    expect(data.length).toEqual(30);
    expect(Object.keys(data[0])).toEqual(["name", "gender"]);
    expect(data[10].gender).toEqual("male");
  });

  it("should generate by schema code array", () => {
    gen.schemas.addSchema("myFirstCode", "test", {
      name: { type: "firstName" },
      gender: { type: "fixedValue", value: "male" }
    });

    const data = gen.generate(["myFirstCode","test"], 30);

    expect(data.length).toEqual(30);
    expect(Object.keys(data[0])).toEqual(["name", "gender"]);
    expect(data[10].gender).toEqual("male");
  });

  it("should generate by schema code string", () => {
    gen.schemas.addSchema("myFirstCodeString", "test", {
      name: { type: "firstName" },
      gender: { type: "fixedValue", value: "male" }
    });

    const data = gen.generate("myFirstCodeString,test", 30);

    expect(data.length).toEqual(30);
    expect(Object.keys(data[0])).toEqual(["name", "gender"]);
    expect(data[10].gender).toEqual("male");
  });

  it("should generate array by schema", () => {
    gen.schemas.addSchema("second", "test", {
      name: { type: "firstName", size: 10 },
      gender: { type: "fixedValue", value: "male" }
    });

    const schemas = gen.schemas.getSchema("second", "test");
    const data = gen.generate(schemas, 2);

    expect(data.length).toEqual(2);
    expect(Object.keys(data[0])).toEqual(["name", "gender"]);
    expect(data[1].name.length).toEqual(10);
  });

  it("should generate empty array by schema", () => {
    gen.schemas.addSchema("second", "test2", {
      name: { type: "firstName", size: 0 }
    });

    const schemas = gen.schemas.getSchema("second", "test2");
    const data = gen.generate(schemas, 1);

    expect(data[0].name.length).toEqual(0);
  });
});
