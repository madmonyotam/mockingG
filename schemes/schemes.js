const fs = require("fs");
const path = require("path");

class Schemes {
  constructor() {
    this.projectsPath = path.resolve(__dirname, "projects/");

    const firstFileName = this.getFirstFilePath();
    this.projectName = firstFileName;
    this.currentPath = path.resolve(this.projectsPath, `${firstFileName}.json`);
    this.setSchemesFromFile();
  }

  getFirstFilePath() {
    const fileName = this.getFilesNames()[0];
    if(!fileName) return 'Gen';
    return fileName;
  }

  getFilesNames() {
    let files = fs.readdirSync(this.projectsPath);
    files = files.map(f => f.split(".")[0]);
    return files;
  }

  setSchemesFromFile() {
    if (!fs.existsSync(this.currentPath)) {
      fs.writeFileSync(this.currentPath, "{}");
      this.schemes = require(this.currentPath);
    } else {
      this.schemes = require(this.currentPath);
    }
  }

  saveByFileName(fileName) {
    const filePath = path.resolve(this.projectsPath, `${fileName}.json`);
    this.currentPath = filePath;
    this.projectName = fileName;
    fs.writeFileSync(filePath, JSON.stringify(this.schemes, null, 2));
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
      res.send({data:this.schemes,projectName:this.projectName});
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

    app.get("/mocking_G/getScheme", (req, res) => {
      const { query } = req;
      const { library, category } = query;
      if (!library || !category) {
        res.status(400).send("missing library or category in query");
      }

      res.send(this.getScheme(library, category));
    });

    app.get("/mocking_G/removeFromScheme", (req, res) => {
      const { query } = req;
      const { library, category, field } = query;
      if (!library || !category) {
        res.status(400).send("missing library or category in query");
      }

      this.removeFromScheme(library, category, field);
      res.send(this.getScheme(library, category));
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

      this.removeScheme(library, category);
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

    app.get("/mocking_G/replaceScheme", (req, res) => {
      const { query } = req;
      const { library, category, scheme } = query;

      if (!library || !category || !scheme) {
        res.status(400).json({
          message: "missing library,category or scheme"
        });
      }

      this.replaceScheme(library, category, JSON.parse(scheme));
      res.send(this.getScheme(library, category));
    });
  }

  writeSchemesToFile() {
    fs.writeFileSync( this.currentPath, JSON.stringify(this.schemes, null, 2) );
  }

  getScheme(library, category) {
    if (!this.schemes[library]) return undefined;
    return this.schemes[library][category];
  }

  getAllLibraries() {
    return Object.keys(this.schemes);
  }

  getCategoriesFromLibrary(library) {
    if (!this.schemes[library]) return undefined;
    return Object.keys(this.schemes[library]);
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

  addScheme(library, category, scheme) {
    if (!this.schemes[library]) this.schemes[library] = {};

    if (this.schemes[library][category]) throw Error("scheme all ready exist");
    this.schemes[library][category] = scheme;
    this.writeSchemesToFile();
  }

  addToScheme(library, category, field) {
    if (!this.schemes[library]) throw Error("library does not exist");
    if (!this.schemes[library][category])
      throw Error(`category does not exist on library ${library}`);

    this.schemes[library][category] = {
      ...this.schemes[library][category],
      field
    };

    this.writeSchemesToFile();
  }

  removeFromScheme(library, category, field) {
    if (!this.schemes[library]) throw Error("library does not exist");
    if (!this.schemes[library][category])
      throw Error(`category does not exist on library ${library}`);

    delete this.schemes[library][category][field];
    this.writeSchemesToFile();
  }

  replaceScheme(library, category, scheme) {
    this.schemes[library][category] = scheme;
    this.writeSchemesToFile();
  }

  removeScheme(library, category) {
    delete this.schemes[library][category];
    this.writeSchemesToFile();
  }

  addCategory(library, category) {
    if (!this.schemes[library]) throw Error("library does not exist");
    if (this.schemes[library][category])
      throw Error(`category ${category} all ready exist`);
    this.schemes[library][category] = {};
    this.writeSchemesToFile();
  }

  removeLibrary(library) {
    delete this.schemes[library];
    this.writeSchemesToFile();
  }

  addLibrary(name) {
    if (this.schemes[name]) {
      throw Error(`library ${library} all ready exist`);
    }
    this.schemes[name] = {};
    this.writeSchemesToFile();
  }

  editCategory(library, oldName, newName) {
    if (!this.schemes[library]) throw Error("library does not exist");
    if (this.schemes[library][newName]) throw Error(`category ${newName} all ready exist`);

    this.schemes[library][newName] = this.schemes[library][oldName];
    delete this.schemes[library][oldName];
    this.writeSchemesToFile();
  }

  editLibrary(oldName, newName) {
    if (this.schemes[newName]) throw Error(`library ${newName} all ready exist`);

    this.schemes[newName] = this.schemes[oldName];
    delete this.schemes[oldName];
    this.writeSchemesToFile();
  }
}

module.exports = Schemes;
