import Baobab from 'baobab';

const tree = new Baobab({
  libs: [],
  cats: [],
  items: [],
  focus: {
    lib: null,
    cat: null,
    item: null
  },
  selected: null,
  viewKey: 'initKey'
});

window.tree = tree;

export default tree;