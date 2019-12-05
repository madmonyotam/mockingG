import Baobab from 'baobab';

const tree = new Baobab({
  libs: [],
  cats: [],
  items: [],
  mockData: null,
  focus: {
    lib: null,
    cat: null,
    item: null
  },
  drag: false,
  selected: null,
  selectedCategory: null,
  selectedLibrary: null,
  viewKey: 'initKey',
  packView: 'project' // 'types'
});

window.tree = tree;

export default tree;