import { get } from "../../plugins/requests";
import { onChangeFromEditor } from "../../plugins/canvases/utils/packUtils";

export function setItems(tree, items) {
  tree.set(["items"], items);
}

export function generate(tree, items, amount = 1) {
  get("/generate", { scheme: items, amount })
    .then(res => {
      tree.set("mockData", res.data);
    })
    .catch(err => {
      //TODO: notify type does not exist
      console.log(err.response.data.message);
    });
}

function replaceScheme(tree, items) {
  const library = tree.get("selectedLibrary");
  const category = tree.get("selectedCategory");

  get("/replaceScheme", { scheme: items, library, category })
    .then(res => {
      tree.set("items", res.data);
      onChangeFromEditor(library, category, res.data);
    })
    .catch(err => {
      //TODO: notify type does not exist
      console.log(err.response.data.message);
    });
}

export function onEditorChange(tree, items) {
  generate(tree, items, 1);
  replaceScheme(tree, items);
}

export function setItemToFocus(tree, item) {
  tree.set(["focus", "item"], item);
}

export function setSelected(tree, item) {
  const cat = tree.get(["focus", "cat"]);
  tree.set(["selected"], `${cat}:${item}`);
}

export function removeItem(tree, field) {
  const focus = tree.get(["focus"]);
  const library = focus.lib;
  const category = focus.cat;

  get("/removeFromScheme", { library, category, field }).then(res => {
    tree.set("items", res.data);
  });
}