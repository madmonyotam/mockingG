import Baobab from 'baobab';

const tree = new Baobab({
  types: {},
  projectName: "project",
  libs: [],
  cats: [],
  items: [],
  mockData: null,
  focus: {
    lib: null,
    cat: null,
    item: null
  },

  packView: 'project', // 'types'
  drag: false,
  selected: null,
  selectedCategory: null,
  selectedLibrary: null,

  collapse: false,
  viewKey: 'initKey',
  openMenu: false
});

window.tree = tree;

export default tree;