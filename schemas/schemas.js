const fs = require("fs");
const path = require("path");

class schemas {
  constructor() {
    this.init();
  }

  init(userPath) {
    this.projectsPath = userPath || path.resolve(__dirname, "projects/");

    const firstFileName = this.getFirstFilePath();
    this.projectName = firstFileName;
    this.currentPath = path.resolve(this.projectsPath, `${firstFileName}.json`);
    this.setschemasFromFile();
  }

  setPath(userPath) {
    this.init(userPath)
  }

  getFirstFilePath() {
    const fileName = this.getFilesNames()[0];
    if(!fileName) return 'Gen';
    return fileName;
  }

  getFilesNames() {
    let files = fs.readdirSync(this.projectsPath);
    files = files.filter(f => {return f.split(".")[1] === 'json' ? true : false});
    files = files.map(f => f.split(".")[0]);
    return files;
  }

  setschemasFromFile() {
    if (!fs.existsSync(this.currentPath)) {
      fs.writeFileSync(this.currentPath, "{}");
      this.schemas = require(this.currentPath);
    } else {
      this.schemas = require(this.currentPath);
    }
  }

  saveByFileName(fileName) {
    const filePath = path.resolve(this.projectsPath, `${fileName}.json`);
    this.currentPath = filePath;
    this.projectName = fileName;
    fs.writeFileSync(filePath, JSON.stringify(this.schemas, null, 2));
  }

  setApp(app) {
    this.app = app;

    app.get("/mocking_G/saveAs", (req, res) => {
      const { query } = req;
      const { fileName } = query;
      this.saveByFileName(fileName);
      res.send("This file has been saved!");
    });

    app.get("/mocking_G/getFilesNames", (req, res) => {
      res.send(this.getFilesNames());
    });

    app.get("/mocking_G/getAll", (req, res) => {
      res.send({data:this.getAll(),projectName:this.projectName});
    });

    app.get("/mocking_G/getAllLibraries", (req, res) => {
      res.send({libraries:this.getAllLibraries(),projectName:this.projectName});
    });

    app.get("/mocking_G/getCategoriesFromLibrary", (req, res) => {
      const { query } = req;
      const { library } = query;
      if (!library) {
        res.status(400).send("missing library in query");
      }

      res.send(this.getCategoriesFromLibrary(library));
    });

    app.get("/mocking_G/getSchema", (req, res) => {
      const { query } = req;
      const { library, category } = query;
      if (!library || !category) {
        res.status(400).send("missing library or category in query");
      }

      res.send(this.getSchema(library, category));
    });

    app.get("/mocking_G/removeFromSchema", (req, res) => {
      const { query } = req;
      const { library, category, field } = query;
      if (!library || !category) {
        res.status(400).send("missing library or category in query");
      }

      this.removeFromSchema(library, category, field);
      res.send(this.getSchema(library, category));
    });

    app.get("/mocking_G/addLibrary", (req, res) => {
      const { query } = req;
      const { library } = query;

      if (!library) {
        res.status(400).send("missing library name");
      }

      try {
        this.addLibrary(library);
        res.send(this.getAllLibraries());
      } catch (error) {
        res.status(400).json({
          message: `library ${library} all ready exist`
        });
      }
    });

    app.get("/mocking_G/removeLibrary", (req, res) => {
      const { query } = req;
      const { library } = query;

      if (!library) {
        res.status(400).send("missing library name");
      }

      this.removeLibrary(library);
      res.send(this.getAllLibraries());
    });

    app.get("/mocking_G/editLibrary", (req, res) => {
      const { query } = req;
      const { oldName, newName } = query;
      
      if (!oldName || !newName) {
        res.status(400).send("missing library new or old name");
      }

      this.editLibrary(oldName, newName);
      res.send(this.getAllLibraries());
    });

    app.get("/mocking_G/addCategory", (req, res) => {
      const { query } = req;
      const { library, category } = query;

      if (!library || !category) {
        res.status(400).send("missing library or category name");
      }

      try {
        this.addCategory(library, category);
        res.send(this.getCategoriesFromLibrary(library));
      } catch (error) {
        res.status(400).json({
          message: `category ${category} all ready exist`
        });
      }
    });

    app.get("/mocking_G/removeCategory", (req, res) => {
      const { query } = req;
      const { library, category } = query;

      if (!library || !category) {
        res.status(400).send("missing library or category name");
      }

      this.removeschema(library, category);
      res.send(this.getCategoriesFromLibrary(library));
    });

    app.get("/mocking_G/editCategory", (req, res) => {
      const { query } = req;
      const { oldName, newName, library } = query;

      if (!library) {
        res.status(400).send("missing library name");
      }
      
      if (!oldName || !newName) {
        res.status(400).send("missing category new or old name");
      }

      this.editCategory(library, oldName, newName);
      res.send(this.getCategoriesFromLibrary(library));
    });

    app.get("/mocking_G/replaceSchema", (req, res) => {
      const { query } = req;
      const { library, category, schema } = query;

      if (!library || !category || !schema) {
        res.status(400).json({
          message: "missing library,category or schema"
        });
      }

      this.replaceSchema(library, category, JSON.parse(schema));
      res.send(this.getSchema(library, category));
    });

    app.get("/mocking_G/addItem", (req, res) => {
      const { query } = req;
      const { library, category, field } = query;

      if (!library || !category || !field) {
        res.status(400).json({
          message: "missing library,category or field"
        });
      }

      this.addToSchema(library, category, JSON.parse(field));
      res.send(this.getSchema(library, category));
    });

    app.get("/mocking_G/editItem", (req, res) => {
      const { query } = req;
      const { oldName, newName, library, category } = query;

      if (!library) {
        res.status(400).send("missing library name");
      }

      if (!category) {
        res.status(400).send("missing category name");
      }
      
      if (!oldName || !newName) {
        res.status(400).send("missing category new or old name");
      }

      this.editItem(library, category, oldName, newName);
      res.send(this.getSchema(library,category));
    });

    app.get("/mocking_G/getAllCategoriesPath", (req, res) => {
      res.send(this.getAllCategoriesPath());
    });
  }

  writeSchemasToFile() {
    fs.writeFileSync( this.currentPath, JSON.stringify(this.schemas, null, 2) );
  }

  getSchema(library, category) {
    if (!this.schemas[library]) return undefined;
    return this.schemas[library][category];
  }

  getAll() {
    return this.schemas;
  }

  getAllLibraries() {
    return Object.keys(this.schemas);
  }

  getCategoriesFromLibrary(library) {
    if (!this.schemas[library]) return undefined;
    return Object.keys(this.schemas[library]);
  }

  getAllCategoriesPath() {
    let arrayOfCategories = [];
    const libs = this.getAllLibraries();
    libs.forEach(lib => {
      const cats = this.getCategoriesFromLibrary(lib);

      cats.forEach(cat => {
        const path = `${lib}.${cat}`;
        arrayOfCategories.push(path);
      });
    });

    return arrayOfCategories;
  }

  addschema(library, category, schema) {
    if (!this.schemas[library]) this.schemas[library] = {};

    if (this.schemas[library][category]) throw Error("schema all ready exist");
    this.schemas[library][category] = schema;
    this.writeSchemasToFile();
  }

  addToSchema(library, category, field) {
    if (!this.schemas[library]) throw Error("library does not exist");
    if (!this.schemas[library][category])
      throw Error(`category does not exist on library ${library}`);

    this.schemas[library][category] = {
      ...this.schemas[library][category],
      ...field
    };

    this.writeSchemasToFile();
  }

  removeFromSchema(library, category, field) {
    if (!this.schemas[library]) throw Error("library does not exist");
    if (!this.schemas[library][category])
      throw Error(`category does not exist on library ${library}`);

    delete this.schemas[library][category][field];
    this.writeSchemasToFile();
  }

  replaceSchema(library, category, schema) {
    this.schemas[library][category] = schema;
    this.writeSchemasToFile();
  }

  removeschema(library, category) {
    delete this.schemas[library][category];
    this.writeSchemasToFile();
  }

  addCategory(library, category) {
    if (!this.schemas[library]) throw Error("library does not exist");
    if (this.schemas[library][category])
      throw Error(`category ${category} all ready exist`);
    this.schemas[library][category] = {};
    this.writeSchemasToFile();
  }

  removeLibrary(library) {
    delete this.schemas[library];
    this.writeSchemasToFile();
  }

  addLibrary(name) {
    if (this.schemas[name]) {
      throw Error(`library ${library} all ready exist`);
    }
    this.schemas[name] = {};
    this.writeSchemasToFile();
  }

  editItem(library, category, oldName, newName){
    if (!this.schemas[library]) throw Error(`library ${library} does not exist`);
    if (!this.schemas[library][category]) throw Error(`category ${category} does not exist`);
    if (this.schemas[library][category][newName]) throw Error(`item ${newName} all ready exist`);

    this.schemas[library][category][newName] = this.schemas[library][category][oldName];
    delete this.schemas[library][category][oldName];
    this.writeSchemasToFile();
  }

  editCategory(library, oldName, newName) {
    if (!this.schemas[library]) throw Error("library does not exist");
    if (this.schemas[library][newName]) throw Error(`category ${newName} all ready exist`);

    this.schemas[library][newName] = this.schemas[library][oldName];
    delete this.schemas[library][oldName];
    this.writeSchemasToFile();
  }

  editLibrary(oldName, newName) {
    if (this.schemas[newName]) throw Error(`library ${newName} all ready exist`);

    this.schemas[newName] = this.schemas[oldName];
    delete this.schemas[oldName];
    this.writeSchemasToFile();
  }
}

module.exports = schemas;
