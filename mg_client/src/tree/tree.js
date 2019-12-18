import Baobab from 'baobab';

const tree = new Baobab({
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
});

window.tree = tree;

export default tree;