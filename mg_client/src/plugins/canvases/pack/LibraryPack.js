import { v4 } from "node-uuid";
import { find, findIndex } from "lodash";
import Pack from "./Pack";

export default class LibraryPack extends Pack {
  constructor(params) {
    super(params);

    this.limitByLevel = 3;
  }

  findLibrary(lib) {
    const library = find(this.mainData.children, c => {
      return c.name === lib;
    });

    return library;
  }

  findCategory(lib, cat) {
    const category = find(lib.children, l => {
      return l.name === cat;
    });

    return category;
  }

  findItem(category, item) {
    const it = find(category.children, l => {
      return l.name === item;
    });

    return it;
  }

  onLibrarySelected(lib) {
    const library = this.findLibrary(lib);
    this.createPack(library);
  }

  onCategorySelected(lib, cat) {
    const library = this.findLibrary(lib);
    const category = this.findCategory(library, cat);
    this.createPack(category);
  }

  onItemSelected(lib, cat, it) {
    const library = this.findLibrary(lib);
    const category = this.findCategory(library, cat);
    const item = this.findItem(category, it);
    this.createPack(item);
  }

  onRemoveLibrary(lib) {
    const { mainData } = this;

    mainData.children = mainData.children.filter(l => {
      return l.name !== lib;
    });

    this.createPack(mainData);
  }

  onEditLibrary(oldName, newName) {
    const { mainData } = this;

    mainData.children = mainData.children.map(l => {
      if (l.name === oldName) {
        l.name = newName;
      }
      return l;
    });

    this.createPack(mainData);
  }

  onEditCategory(lib, oldName, newName) {
    const library = this.findLibrary(lib);

    library.children = library.children.map(c => {
      if (c.name === oldName) {
        c.name = newName;
      }
      return c;
    });

    this.createPack(library);
  }

  onRemoveCategory(lib, cat) {
    const library = this.findLibrary(lib);
    library.children = library.children.filter(l => l.name !== cat);
    this.createPack(library);
  }

  onRemoveItem(lib, cat, it) {
    const library = this.findLibrary(lib);
    const category = this.findCategory(library, cat);

    category.children = category.children.filter(l => l.name !== it);
    this.createPack(category);
  }

  onChangeFromEditor(lib, cat, editorData) {
    const { mainData } = this;

    const library = this.findLibrary(lib);
    let category = this.findCategory(library, cat);

    const root = {
      name: category.name,
      value: 1,
      children: [],
      id: category.id,
      level: 2
    };

    category = this.normalizeData(editorData, root);

    const libIndex = findIndex(mainData.children, ["name", lib]);
    const catIndex = findIndex(library.children, ["name", cat]);

    mainData.children[libIndex].children[catIndex] = category;
    this.createPack(category);
  }

  onAddLibrary(newLib) {
    const { mainData } = this;

    mainData.children.push({
      name: newLib,
      value: 1,
      children: [],
      id: v4(),
      level: 1
    });

    this.createPack(mainData);
  }

  onAddCategory(lib, newCat) {
    const library = this.findLibrary(lib);

    library.children.push({
      name: newCat,
      value: 1,
      children: [],
      id: v4(),
      level: 2
    });

    this.createPack(library);
  }

  onAddItem(lib,cat,newItem) {
    const library = this.findLibrary(lib);
    const category = this.findCategory(library, cat);

    category.children.push({
      name: newItem,
      value: 1,
      children: [],
      id: v4(),
      level: 2
    });
    
    this.createPack(category);
  }

  onBack(lib) {
    const { mainData } = this;

    if (lib) {
      const library = this.findLibrary(lib);
      return this.createPack(library);
    }

    this.createPack(mainData);
  }
}
