const fs = require("fs");
const mySchemes = require("./mySchemes.json");

class Schemes {
  constructor() {
    this.schemes = mySchemes;
  }

  setApp(app) {
    this.app = app;
    app.use("/mocking_G/write", (req, res) => {
      this.writeSchemesToFile(err => {
        if (err) {
          res.status(400).send("check your data");
        }

        res.send("The file was saved!");
      });
    });

    app.get("/mocking_G/getAll", (req, res) => {
      res.send(this.schemes);
    });

    app.get("/mocking_G/getAllLibraries", (req, res) => {
      res.send(this.getAllLibraries());
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
      res.send( this.getScheme(library, category) );
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
        res.status(400)
        .json({
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

    app.get("/mocking_G/addCategory", (req, res) => {
      const { query } = req;
      const { library, category } = query;

      if (!library || !category) {
        res.status(400).send("missing library or category name");
      }

      try {
        this.addCategory(library,category);
        res.send(this.getCategoriesFromLibrary(library));
      } catch (error) {
        res.status(400)
        .json({
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
  }

  writeSchemesToFile(cb = () => {}) {
    fs.writeFile(
      "./schemes/mySchemes.json",
      JSON.stringify(this.schemes, null, 2),
      function(err) {
        cb(err);
      }
    );
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

  addScheme(library, category, scheme) {
    if (!this.schemes[library]) this.schemes[library] = {};

    if (this.schemes[library][category]) throw Error("scheme all ready exist");
    this.schemes[library][category] = scheme;
  }

  addToScheme(library, category, field) {
    if (!this.schemes[library]) throw Error("library does not exist");
    if (!this.schemes[library][category])
      throw Error(`category does not exist on library ${library}`);

    this.schemes[library][category] = {
      ...this.schemes[library][category],
      field
    };
  }

  removeFromScheme(library, category, field) {
    if (!this.schemes[library]) throw Error("library does not exist");
    if (!this.schemes[library][category])
      throw Error(`category does not exist on library ${library}`);

    delete this.schemes[library][category][field];
  }

  replaceScheme(scheme) {
    this.schemes[library][category] = scheme;
  }

  removeScheme(library, category) {
    delete this.schemes[library][category];
  }

  addCategory(library, category) {
    if (!this.schemes[library]) throw Error("library does not exist");
    if (this.schemes[library][category]) throw Error(`category ${category} all ready exist`);
    this.schemes[library][category] = {};
  }

  removeLibrary(library) {
    delete this.schemes[library];
  }

  addLibrary(name) {
    if (this.schemes[name]) {
      throw Error(`library ${library} all ready exist`);
    }
    this.schemes[name] = {};
  }

  editCategory(library, oldName, newName) {}

  editLibrary(oldName, newName) {}
}

module.exports = Schemes;
