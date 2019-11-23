const gen = require("./generator");

describe("generate function", () => {
  it("should generate 10 items", () => {
    const scheme = {
      name: { type: "firstName" }
    };

    const data = gen.generate(scheme);

    expect(data.length).toEqual(10);
  });

  it("should generate 100 items", () => {
    const scheme = {
      name: { type: "firstName" }
    };

    const data = gen.generate(scheme, 100);

    expect(data.length).toEqual(100);
  });

  it("should generate 10000 items as max", () => {
    const scheme = {
      name: { type: "firstName" }
    };

    const data = gen.generate(scheme, 10005);

    expect(data.length).toEqual(10000);
  });

  it("should generate by scheme", () => {
    gen.schemes.addScheme("myFirst", "test", {
      name: { type: "firstName" },
      gender: { type: "fixedValue", value: "male" }
    });

    const schemes = gen.schemes.getScheme("myFirst", "test");
    const data = gen.generate(schemes, 30);

    expect(data.length).toEqual(30);
    expect(Object.keys(data[0])).toEqual(["name", "gender"]);
    expect(data[10].gender).toEqual("male");
  });

  it("should generate by scheme code array", () => {
    gen.schemes.addScheme("myFirstCode", "test", {
      name: { type: "firstName" },
      gender: { type: "fixedValue", value: "male" }
    });

    const data = gen.generate(["myFirstCode","test"], 30);

    expect(data.length).toEqual(30);
    expect(Object.keys(data[0])).toEqual(["name", "gender"]);
    expect(data[10].gender).toEqual("male");
  });

  it("should generate by scheme code string", () => {
    gen.schemes.addScheme("myFirstCodeString", "test", {
      name: { type: "firstName" },
      gender: { type: "fixedValue", value: "male" }
    });

    const data = gen.generate("myFirstCodeString,test", 30);

    expect(data.length).toEqual(30);
    expect(Object.keys(data[0])).toEqual(["name", "gender"]);
    expect(data[10].gender).toEqual("male");
  });

  it("should generate array by scheme", () => {
    gen.schemes.addScheme("second", "test", {
      name: { type: "firstName", size: 10 },
      gender: { type: "fixedValue", value: "male" }
    });

    const schemes = gen.schemes.getScheme("second", "test");
    const data = gen.generate(schemes, 2);

    expect(data.length).toEqual(2);
    expect(Object.keys(data[0])).toEqual(["name", "gender"]);
    expect(data[1].name.length).toEqual(10);
  });
});
