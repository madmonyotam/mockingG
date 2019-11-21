import { onCategorySelected } from "../../plugins/canvases/utils/packUtils";
import { get } from "../../plugins/requests";

export function setCats(tree, cats) {
  tree.set(["cats"], cats);
}

export function setCatToFocus(tree, cat) {
  tree.set(["focus", "cat"], cat);
}

export function addCategory(tree, category) {
  const library = tree.get(["focus", "lib"]);

  get("/addCategory", { library, category })
    .then(res => {
      tree.set("cats", res.data);
    })
    .catch(err => {
      console.log(err.response.data.message);
    });
}

export function removeCategory(tree, category) {
  const library = tree.get(["focus", "lib"]);

  get("/removeCategory", { library, category }).then(res => {
    tree.set("cats", res.data);
  });
}

export function getItemsFromCategory(tree, category) {
  const library = tree.get(["focus", "lib"]);

  get("/getScheme", { library, category }).then(res => {
    tree.set("items", res.data);
    setTimeout(() => {
      tree.set(["focus", "cat"], category);
    });
  });
}

export function setKey(tree, { newKey, schemeName }) {
  const viewKey = tree.get('viewKey');
  const lib = tree.get(['focus','lib']);

  if(viewKey !== newKey){
      tree.set('viewKey',newKey);

      setTimeout(() => {
        onCategorySelected(lib,schemeName);
      }, 200) 
  } else {
    onCategorySelected(lib,schemeName);
  }
}
