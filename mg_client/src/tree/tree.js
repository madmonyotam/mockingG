import Baobab from 'baobab';

const tree = new Baobab({
  libs: [],
  cats: [],
  focus: {
    lib: null,
    cat: null
  }
});

window.tree = tree;

export default tree;