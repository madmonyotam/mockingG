import Baobab from 'baobab';

const tree = new Baobab({
  libs: [],
  cats: [],
  items: null,
  mockData: null,
  focus: {
    lib: null,
    cat: null,
    item: null
  },
  selected: null,
  selectedCategory: null,
  viewKey: 'initKey'
});

window.tree = tree;

export default tree;